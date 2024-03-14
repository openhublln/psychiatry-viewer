import { getUsers } from './db'
import fs from 'fs'
import path from 'path'

// const config = readSystemConfigData()
// let rowDataPath = config.rowDataPath
// let resultDataPath = config.resultDataPath

// if (!rowDataPath) {
//   throw new Error('Please define the row data path where the data is stored')
// }

// if (!resultDataPath) {
//   throw new Error(
//     'Please define the result data path where you would like to store your viewer data'
//   )
// }

export async function addPublicKey(key) {
  const dt = new Date()
  const dtime = dt.getTime().toString()

  const homedir = require('os').homedir()
  const src = path.join(homedir, '.ssh', 'authorized_keys')
  const dest = path.join(homedir, '.ssh', 'authorized_keys_saved' + dtime)

  try {
    fs.copyFileSync(src, dest) //make a backup
  } catch (error) {
    fs.writeFileSync(src, '')
  }
  fs.appendFileSync(src, key)
}

export async function checkAccess(username, contentType, contentId) {
  let res
  try {
    const user = await getUsers().where('username', username)
    if (user && user.role === 'admin') {
      return true
    }

    switch (contentType) {
      case 'clean':
        // only if admin
        res = false
        break
      case 'insertUser':
        res = false
        break
      // only if admin
      case 'updateUser':
        // only if admin
        res = false
        break
      case 'insertConfigData':
        // only if admin
        res = false
        break
      case 'allPatients':
        // only if admin
        res = false
        break
      case 'uploadFile':
        res = false
        break
      case 'getFolder':
        res = false
        break
      case 'deleteFolder':
        res = false
        break
      case 'publicKey':
        // only if admin
        res = false
        break
      // case 'patientViewerData':
      //   dbRes = await getPatientDataPath().where({
      //     id: new ObjectId(contentId),
      //     user: username,
      //   })
      //   res = dbRes ? true : false
      //   if (!res) {
      //     console.log(
      //       username + ' tried to access patient data path' + contentId
      //     )
      //   }
      //   break
      default:
        res = false
    }

    return res
  } catch (error) {
    throw new Error('Check Access: ' + error)
  }
}
