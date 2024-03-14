import { getDatabase, initializeTables } from '../lib/db.js'
import fs from 'fs/promises'
import { Role, UserFunctions, Hospitals } from '../models/userModel.js'
import { createUserRaw } from '../lib/user.js'
import { ConfigurationPathNames } from '../lib/configuration.js'
;(async () => {
  try {
    await fs.mkdir('../database/')
  } catch (e) {}
  try {
    await fs.rm('../database/dev.sqlite3')
  } catch (e) {}

  let database = getDatabase()
  await initializeTables()

  // table: role
  await database('role').insert({
    name: 'admin',
  })
  await database('role').insert({
    name: 'expert',
  })
  await database('role').insert({
    name: 'no expert',
  })

  // table: permission
  await database('permission').insert({
    name: 'all',
  })
  await database('permission').insert({
    name: 'write',
  })
  await database('permission').insert({
    name: 'read',
  })

  // Disease
  await database('disease').insert({
    name: 'Diabetes',
  })
  await database('disease').insert({
    name: 'High blood pressure',
  })
  await database('disease').insert({
    name: 'Cold',
  })

  // role permission
  await database('rolepermission').insert({
    role: 1,
    permission: 1,
  })

  await database('rolepermission').insert({
    role: 2,
    permission: 2,
  })
  await database('rolepermission').insert({
    role: 3,
    permission: 3,
  })

  //==================================================================
  // Test data
  //==================================================================

  console.log('\n*** Warning! ***')
  console.log('*** Test accounts created with default passwords! ***')
  console.log('*** Do not ship this database to customer ***\n')

  await createUserRaw({
    username: 'admin_BV',
    prename: 'admin',
    name: 'BV',
    email: 'PsychaToolTest@gmail.com',
    role: Role.admin,
    userfunction: UserFunctions.admin,
    hospital: Hospitals.BV,
    phonenumber: '123456789',
    password: 'admin',
    status: 'registering',
    registrationuuid: '123456',
  })

  await createUserRaw({
    username: 'doc_BV',
    prename: 'doc',
    name: 'BV',
    email: 'PsychaToolTest@gmail.com',
    role: Role.expert,
    userfunction: UserFunctions.psychiatrist,
    hospital: Hospitals.BV,
    phonenumber: '0032565656',
    password: 'doc',
    status: 'registering',
    registrationuuid: '654321',
  })

  await createUserRaw({
    username: 'nurseSL',
    prename: 'nurse',
    name: 'SL',
    email: 'PsychaToolTest@gmail.com',
    role: Role.noexpert,
    userfunction: UserFunctions.nurse,
    hospital: Hospitals.SL,
    phonenumber: '0032565656',
    password: 'nurse',
    status: 'registering',
    registrationuuid: '654322',
  })

  // permission
  await database('permission').insert({
    name: 'createaccount',
  })
  await database('permission').insert({
    name: 'modifyaccount',
  })
  await database('permission').insert({
    name: 'deleteaccount',
  })
  await database('permission').insert({
    name: 'readdata',
  })
  await database('permission').insert({
    name: 'modifydata',
  })
  await database('permission').insert({
    name: 'deletedata',
  })

  // department
  await database('department').insert({
    departmentname: 'psychiatrie',
    hospitalname: 'Cliniques universitaires Saint-Luc',
    address: 'Avenue Hippocrate 10, 1200 Bruxelles',
  })

  await database('department').insert({
    departmentname: 'Inner medicine',
    hospitalname: 'Saint-Pierre Ottignies Clinic',
    address: 'Av. Reine Fabiola 9, 1340 Ottignies-Louvain-la-Neuve',
  })

  // Document
  await database('document').insert({
    createdate: Date.now(),
    pathtofolder:
      'C:\\Users\\zhaow\\Documents\\Work\\OpenHUB-PsychiatryTest\\test_data\\resultData',
    expert: 2,
    conclusion: 'patient conclusion',
  })

  // expert department
  // await database('expertdepartment').insert({
  //   expert: 2,
  //   department: 0,
  // })

  // patient document
  // await database('patientdocument').insert({
  //   patient: 1,
  //   document: 0,
  // })

  // patient disease
  // await database('patientdisease').insert({
  //   patient: 1,
  //   disease: 0,
  //   diagnosedate: Date.now(),
  // })

  // ***** system configuration
  // await database('configuration').insert({
  //   name: ConfigurationPathNames.sourceDataPath,
  //   value: 'your/data/path',
  //   nodelete: true,
  // })

  await database('configuration').insert({
    name: ConfigurationPathNames.resultPath,
    value: 'config data for the system',
    nodelete: true,
  })

  await getDatabase().destroy()
})()
