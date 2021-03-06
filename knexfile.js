// Update with your config settings.

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {

  development: {
    ...sharedConfig,
    connection: { filename: './data/tech-fundraiser-dev.db3'},
    seeds: {directory: './data/seeds'}
  },

  testing: {
    ...sharedConfig,
    connection: { filename: './data/test.db3'},
    seeds: {directory: './data/seeds'}
  },

  staging: {
    client: 'sqlite3',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    ...sharedConfig,
    connection: { filename: './data/tech-fundraiser.db3'},
    seeds: {directory: './data/seeds'}
  }

};
