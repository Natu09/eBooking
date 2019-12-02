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



    addUser(user) {
        return knex('users').insert(user)
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
    },

    getAllAvailableApt() {
        return knex.raw('SELECT doc.userid AS doc_id, doc.start_time AS start, doc.end_time AS end FROM "availabilities" as doc \
                        WHERE NOT EXISTS (SELECT * FROM "appointment" as apt \
                         WHERE apt.doctor_id = doc.userid AND ((doc.start_time, doc.end_time)OVERLAPS(apt.start_time, apt.end_time)));')
    },

    getAllApt(id) {
        try {
            let result = knex.raw('SELECT doctor_id AS doc_id, start_time AS start, end_time as end FROM "appointment" WHERE patient_id = ?', [id])

            return result
        } catch (error) {
            throw error
        }
    }
}