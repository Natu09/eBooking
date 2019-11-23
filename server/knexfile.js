// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    version: 11.5,
    connection: {
      host: process.env.DB_CONN,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },

};
