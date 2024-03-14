export const Gender = { Male: 'Male', Female: 'Female', Other: 'Other' }

export const Role = {
  admin: 'Admin',
  expert: 'Expert',
  noexpert: 'No Expert',
}

export class User {
  constructor(
    username,
    prename,
    name,
    niss,
    phone,
    password,
    email,
    role,
    userfunction,
  ) {
    // this.id = id
    this.username = username
    this.prename = prename
    this.name = name
    this.niss = niss
    this.birthdate = birthdate
    this.role = role
    this.userfunction = userfunction
    this.password = password
    this.phone = phone
    this.email = email
  }
}

export const UserFunctions = {
  admin: 'Admin',
  psychiatrist: 'psychiatre',
  psychologist: 'psychologue',
  occupationalTherapist: 'ergothérapeute',
  educator: 'éducateur/-trice',
  nurse: 'infirmier/-ière',
  physicalTherapist: 'kinésithérapeute',
}

export const Hospitals = {
  BV: 'Beau Vallon',
  SL: 'Cliniques universitaires Saint-Luc',
}
