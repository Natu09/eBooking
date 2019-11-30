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

    addAdmin(username, password) {
        const admin_info = {
            username: username,
            password: password
        }
        return knex('admin').insert(admin_info)
    },

    updateDOB(id, date) {
        return knex('users').where('userid', id).update({ dob: date })
    },

    async getAllDoc() {
        try {
            res = await knex.raw('SELECT d.userid, u.lname, u.fname FROM doctor AS d, users AS u WHERE d.userid = u.userid;')
            console.log(res.rows)
            return res.rows

        } catch (error) {
            throw error

        }
    }
}