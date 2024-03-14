import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import * as OTPAuth from 'otpauth'
import hibase32 from 'hi-base32'
import { getUsers } from '../lib/db.js'
import { Role } from '../models/userModel.js'
import { readSystemConfigData } from '../utils/readConfig.js'

const { encode } = hibase32

const ValidationResult = {
  Okay: 'Okay',
  InvalidUsername: 'Invalid user name',
  InvalidEmail: 'Invalid e-mail',
  InvalidPassword: 'Invalid password',
  TakenUsername: 'User name already exists',
}

export async function createUserRaw(userData) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512')
    .toString('hex')

  await getUsers().insert({
    username: userData.username,
    prename: userData.prename,
    name: userData.name,
    niss: userData.niss,
    hash: hash,
    email: userData.email,
    role: userData.role,
    userfunction: userData.userfunction,
    hospital: userData.hospital,
    salt: salt,
    birthdate: userData.birthdate,
    phonenumber: userData.phonenumber,
    status: userData.status,
    registrationuuid: userData.registrationuuid,
  })
}

export async function createNewUser(userData) {
  const validationResult = await validateUserData(userData, true)
  if (validationResult !== ValidationResult.Okay) {
    throw new Error(validationResult)
  }

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(userData.password, salt, 1000, 64, 'sha512')
    .toString('hex')

  await getUsers().insert({
    username: userData.username,
    prename: userData.prename,
    name: userData.name,
    niss: userData.niss,
    hash: hash,
    email: userData.email,
    role: userData.role,
    salt: salt,
    userfunction: userData.userFunction,
    hospital: userData.hospital,
    birthdate: userData.birthdate,
    phonenumber: userData.phonenumber,
    status: 'registering',
    registrationuuid: uuidv4(),
    secret: null,
  })

  return userData.username
}

function generateSecretBase32() {
  const buffer = crypto.randomBytes(15)
  const secret = encode(buffer).replace(/=/g, '').substring(0, 24)
  return secret
}

export async function getOTPAuthURL(registrationuuid) {
  // check if registration uuid is valid
  const user = await getUsers()
    .where('registrationuuid', registrationuuid)
    .andWhere('status', 'registering')
    .first()
  if (!user) {
    throw new Error('INVALID_REGISTRATION_CODE')
  }

  // generate and store secret
  if (!user.secret) {
    const secret = generateSecretBase32()
    await getUsers().where('username', user.username).update({ secret: secret })
    user.secret = secret
  }

  // create authentication URL
  const issuer = readSystemConfigData().otpIssuer
  const totp = new OTPAuth.TOTP({
    issuer: issuer,
    label: user.username,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: user.secret,
  })

  return totp.toString()
}

export async function validateOTPAuth(registrationuuid, validationCode) {
  // check if registration uuid is valid
  const user = await getUsers()
    .where('registrationuuid', registrationuuid)
    .andWhere('status', 'registering')
    .first()
  if (!user) {
    throw new Error('INVALID_REGISTRATION_CODE')
  }

  // check the validation code
  const issuer = readSystemConfigData().otpIssuer
  const totp = new OTPAuth.TOTP({
    issuer: issuer,
    label: user.username,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: user.secret,
  })
  const delta = totp.validate({ token: validationCode, window: 1 })
  if (delta == null) {
    return false
  }

  // everything is okay, change user status
  await getUsers()
    .where('username', user.username)
    .update({ status: 'normal', registrationuuid: null })
  return true
}

function verifyValidationCode(user, validationCode) {
  // check the validation code
  const issuer = readSystemConfigData().otpIssuer
  const totp = new OTPAuth.TOTP({
    issuer: issuer,
    label: user.username,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: user.secret,
  })
  const delta = totp.validate({ token: validationCode, window: 1 })
  return delta != null
}

export function isAdminUser(user) {
  return user.role === Role.admin || user.role === Role.expert
}

export function isHealthcareProfessional(user) {
  return (
    // user.role == Role.expert || user.role == Role.nurse || user.role == Role.gp
    user.role === Role.expert
  )
}

export function isExpertOrNoExpert(user) {
  return user.role === Role.expert
}

export async function findUser(username) {
  return await getUsers().where('username', username).first()
}

export async function checkUser(username, password, validationCode) {
  const user = await findUser(username)
  if (!user || user.status !== 'normal' || !verifyPassword(user, password)) {
    throw new Error('WRONG_NAME_PASSWORD')
  }
  if (!verifyValidationCode(user, validationCode)) {
    throw new Error('WRONG_AUTH_CODE')
  }
  return user
}

export async function updateUser(userData) {
  const validationResult = await validateUserData(userData, false)
  if (validationResult !== ValidationResult.Okay) {
    throw new Error(validationResult)
  }

  const user = await findUser(userData.username)
  if (!user) {
    throw new Error('NO_USER_FOUND')
  } else {
    const updatedData = {
      username: userData.username,
      prename: userData.prename,
      name: userData.name,
      niss: userData.niss,
      email: userData.email,
      role: userData.role,
      userfunction: userData.userfunction,
      hospital: userData.hospital,
      salt: userData.salt,
      birthdate: userData.birthdate,
      phonenumber: userData.phonenumber,
    }

    if (userData.password) {
      updatedData.salt = crypto.randomBytes(16).toString('hex')
      updatedData.hash = crypto
        .pbkdf2Sync(userData.password, updatedData.salt, 1000, 64, 'sha512')
        .toString('hex')
    }

    await getUsers().where('username', userData.username).update(updatedData)
  }
}

export async function deleteUser(username) {
  const user = await findUser(username)
  if (!user) {
    throw new Error('NO_USER_FOUND')
  } else {
    await getUsers().where('username', username).del()
  }
}

export function verifyPassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

export const validateUsernameInput = (username) =>
  username && /^[a-z,A-Z,0-9]{3,12}$/.test(username)

export const validatePasswordInput = (password) =>
  password && /^[a-z,A-Z,0-9,@$!%*#?&]{8,32}$/.test(password)

export const validateEmailInput = (email) =>
  /* eslint-disable-next-line */
  email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const validateUserData = async (userData, checkUserExists) => {
  if (checkUserExists) {
    const existingUser = await getUsers()
      .where('username', userData.username)
      .first()
    if (existingUser) {
      return ValidationResult.TakenUsername
    }
  }

  if (!validatePasswordInput(userData.password)) {
    return ValidationResult.InvalidPassword
  }
  if (!validateUsernameInput(userData.username)) {
    return ValidationResult.InvalidUsername
  }
  if (!validateEmailInput(userData.email)) {
    return ValidationResult.InvalidEmail
  }

  return ValidationResult.Okay
}
