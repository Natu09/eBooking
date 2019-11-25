// Update with your config settings.
// require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    version: 11.5,
    connection: {
      host: 'e-booking-db.cfwfxw7xy4fu.us-east-2.rds.amazonaws.com',
      user: 'cpsc_471',
      password: 'e-booking19',
      database: 'ebooking_DB'
    }
  },

};
