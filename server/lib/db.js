import { db } from '../config/db-config.js'

export const getDatabase = () => {
  return db
}

export const getUsers = () => {
  return db('user')
}

export const getAuthCodeTable = () => {
  return db('auth2facode')
}

export const getPatients = () => {
  return getUsers().where('role', 'patient')
}

export const getConfiguration = () => {
  return db('configuration')
}

export const getDocumentsOfPatient = (patientId, expertId) => {
  const patientDocIds = db('patientdocument').where('patient', patientId)
  const documents = db('document').where(
    'id',
    patientDocIds.id,
    'expert',
    expertId,
  )
  return documents
}

export async function initializeTables() {
  if (!(await db.schema.hasTable('user'))) {
    await db.schema.createTable('user', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('username').notNullable().unique()
      table.string('prename').notNullable()
      table.string('name').notNullable()
      table.string('niss').nullable()
      table.dateTime('birthdate').nullable()
      table.integer('role').unsigned().notNullable()
      table.string('userfunction').notNullable()
      table.string('hospital').notNullable()
      table.string('hash').notNullable()
      table.string('salt').notNullable()
      table.string('phonenumber').nullable()
      table.string('email').notNullable()
      table.string('status').notNullable()
      table.string('secret').nullable()
      table.uuid('registrationuuid').nullable()
    })
  }

  if (!(await db.schema.hasTable('role'))) {
    await db.schema.createTable('role', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('name').notNullable().unique()

      table.foreign('name').references('role').inTable('user')
    })
  }

  if (!(await db.schema.hasTable('permission'))) {
    await db.schema.createTable('permission', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('name').notNullable().unique()
    })
  }

  if (!(await db.schema.hasTable('department'))) {
    await db.schema.createTable('department', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('departmentname').notNullable()
      table.string('hospitalname').notNullable()
      table.string('address').notNullable()
    })
  }

  if (!(await db.schema.hasTable('auth2facode'))) {
    await db.schema.createTable('auth2facode', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('username').notNullable().unique()
      table.integer('authcode').nullable()
      table.dateTime('codecreateat').nullable()
      table.foreign('username').references('id').inTable('user')
    })
  }

  if (!(await db.schema.hasTable('document'))) {
    await db.schema.createTable('document', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.dateTime('createdate').notNullable()
      table.string('pathtofolder').notNullable()
      table.integer('expert').notNullable()
      table.string('conclusion').nullable()

      table.foreign('expert').references('id').inTable('user')
    })
  }

  if (!(await db.schema.hasTable('disease'))) {
    await db.schema.createTable('disease', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('name').notNullable().unique()
    })
  }

  // if (!(await db.schema.hasTable('patientdisease'))) {
  //   await db.schema.createTable('patientdisease', (table) => {
  //     table.increments('id', {
  //       primaryKey: true,
  //     })
  //     table.integer('patient').notNullable()
  //     table.integer('disease').notNullable()
  //     table.dateTime('diagnosedate').notNullable()

  //     table.foreign('patient').references('id').inTable('user')
  //     table.foreign('disease').references('id').inTable('disease')
  //   })
  // }

  // if (!(await db.schema.hasTable('expertdepartment'))) {
  //   await db.schema.createTable('expertdepartment', (table) => {
  //     table.increments('id', {
  //       primaryKey: true,
  //     })
  //     table.integer('expert').notNullable()
  //     table.integer('department').notNullable()

  //     table.foreign('expert').references('id').inTable('user')
  //     table.foreign('department').references('id').inTable('department')
  //   })
  // }

  // if (!(await db.schema.hasTable('patientdocument'))) {
  //   await db.schema.createTable('patientdocument', (table) => {
  //     table.increments('id', {
  //       primaryKey: true,
  //     })
  //     table.integer('patient').notNullable()
  //     table.integer('document').notNullable()

  //     table.foreign('patient').references('id').inTable('user')
  //     table.foreign('document').references('id').inTable('document')
  //   })
  // }

  if (!(await db.schema.hasTable('rolepermission'))) {
    await db.schema.createTable('rolepermission', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.integer('role').notNullable()
      table.integer('permission').notNullable()

      table.foreign('role').references('id').inTable('role')
      table.foreign('permission').references('id').inTable('permission')
    })
  }

  if (!(await db.schema.hasTable('configuration'))) {
    await db.schema.createTable('configuration', (table) => {
      table.increments('id', {
        primaryKey: true,
      })
      table.string('name').notNullable().unique()
      table.string('value').notNullable()
      table.boolean('nodelete').notNullable()
    })
  }
}
