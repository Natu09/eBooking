const knex = require('./knex'); // the database connection

module.exports = {
    getAllUsers() {
        return knex('users');
    },

    getUserByID(id) {
        return knex('users').where('userid', id).first();
    },

    getAllUserEmail(email) {
        return knex('users').where('email', email);
    },

    getOneByEmail: function (email) {
        return knex('users').where('email', email).first();
    },

    create: function(user) {
        return knex('user').insert(user, 'id').then(ids => {
            return ids[0]
        })
    },

    addAdmin(username, password) {
        const admin_info = {
            username: username,
            password: password
        }
        return knex('admin').insert(admin_info)
    },

    updateDOB(id, date) {
        return knex('users').where('userid', id).update({ dob: date })
    }
}