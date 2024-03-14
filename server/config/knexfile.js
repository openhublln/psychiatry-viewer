import path from 'path'

export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('../database/dev.sqlite3'),
  },
  useNullAsDefault: true,
}
