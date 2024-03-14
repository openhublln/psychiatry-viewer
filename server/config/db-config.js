import knex from 'knex'

import { development } from '../config/knexfile.js'

export const db = knex(development)
