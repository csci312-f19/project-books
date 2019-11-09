// Update with your config settings.
module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './simplepedia-test.db'
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds/test'
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './listings.db'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  }
};

// module.exports = {
//     test: {
//         client: 'sqlite3',
//         useNullAsDefault: true
//     },
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './listings.db'
//     },
//     useNullAsDefault: true
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     useNullAsDefault: true,
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };
