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
        return knex('users').insert(user);
    },


    addUser2(user) {
        const params = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            password: user.password
        }
        return knex.raw('WITH new_userID as (\
                                            INSERT INTO "users" (fname, lname, email, password)\
                                            VALUES (:fname, :lname, :email, :password)\
                                            RETURNING userid\
                        ), new_patientID as (\
                                            INSERT INTO "patient" (userid)\
                                            SELECT newID.userid\
                                            FROM new_userID as newID\
                                            RETURNING userid\
                        )\
                        INSERT INTO "records" (p_userid)\
                        SELECT newID.userid\
                        FROM new_patientID as newID', params)
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
            res = await knex.raw('SELECT    d.userid, u.lname, u.fname \
                                  FROM        doctor AS d, users AS u WHERE d.userid = u.userid;')
            console.log(res.rows)
            return res.rows

        } catch (error) {
            throw error

        }
    },

    getAllAvailableApt() {
        return knex.raw('SELECT     u.fname AS doctor_fname, u.lname AS doctor_lname, \
                                    doc.userid AS doc_id, doc.start_time AS start, doc.end_time AS end, \
                                    clin.clinic_id AS clinic_id, clin.name AS clinic_name, clin.street AS street,\
                                    clin.city AS city, clin.province AS province\
                        FROM        "availabilities" as doc, "users" as u, "clinic" as clin, \
                                    "doctor" as dc\
                        WHERE        doc.userid = u.userid AND dc.clinic_id = clin.clinic_id \
                                    AND doc.userid = dc.userid\
                                    AND NOT EXISTS (SELECT * FROM "appointment" as apt \
                                                WHERE   apt.doctor_id = doc.userid \
                                                        AND ((doc.start_time, doc.end_time)OVERLAPS(apt.start_time, apt.end_time)));')
    },

    getAllApt(id) {
        try {
            let result = knex.raw('SELECT   u.fname AS doctor_fname, u.lname AS doctor_lname, doctor_id AS doc_id, \
                                            a.start_time AS start, a.end_time as end, \
                                            clin.clinic_id AS clinic_id, clin.name AS clinic_name, clin.street AS street,\
                                            clin.city AS city, clin.province AS province\
                                    FROM    "appointment" as a, "users" as u, "clinic" as clin, "room" as r\
                                    WHERE   a.patient_id = ?\
                                            AND a.doctor_id = u.userid\
                                            AND a.room_id = r.room_number\
                                            AND r.clinic_id = clin.clinic_id', [id])

            return result
        } catch (error) {
            throw error
        }
    },

    addApt(id, apt) {
        try {
            let params = {
                dID: parseInt(apt.doctor_id),
                uID: parseInt(id),
                startT: apt.start_time,
                endT: apt.end_time,
                cID: apt.clinic_id
            }
            // let result = knex.raw('INSERT INTO "appointment" (doctor_id, patient_id, start_time, end_time) \
            //                             SELECT :dID, :uID, :startT, :endT\
            //                                     WHERE NOT EXISTS (SELECT * FROM "appointment" AS apt \
            //                                         WHERE (apt.doctor_id = :dID \
            //                                                 AND apt.start_time = :startT \
            //                                                 AND apt.end_time = :endT) \
            //                                                 OR  apt.patient_id = :uID \
            //                                                     AND ((apt.start_time,apt.end_time) \
            //                                                     OVERLAPS (:startT, :endT)))', params);
            let result = knex.raw('WITH AVAILABLE_ROOM(rID)\
            AS\
            (SELECT 	room.room_number\
            FROM		"room" AS room\
            WHERE 		room.clinic_id = :cID\
                        AND room.room_number NOT IN(SELECT apt.room_id\
                                                FROM "appointment" AS apt\
                                                WHERE (apt.start_time, apt.end_time) OVERLAPS (:startT, :endT))\
            LIMIT       1\
             )\
             \
             INSERT INTO 	"appointment" (doctor_id, patient_id, start_time, end_time, room_id)\
             SELECT 		:dID, :uID, :startT, :endT, ab.rID\
             FROM			AVAILABLE_ROOM as ab\
             WHERE			NOT EXISTS	(SELECT * FROM	"appointment" AS apt\
                                         WHERE	(apt.doctor_id = :dID\
                                                AND apt.start_time = :startT\
                                                AND apt.end_time = :endT)\
                                                OR	(apt.patient_id = :uID\
                                                    AND (apt.start_time,apt.end_time)\
                                                    OVERLAPS (:startT, :endT))\
                                         )', params);
            return result
        } catch (error) {
            throw error
        }
    },

    deleteApt(id, apt) {
        try {
            let params = {
                dID: parseInt(apt.doctor_id),
                uID: id,
                startT: apt.start_time,
                endT: apt.end_time
            }
            let result = knex.raw('DELETE FROM "appointment" \
                                WHERE   doctor_id = :dID\
                                        AND patient_id = :uID\
                                        AND start_time = :startT\
                                        AND end_time = :endT', params)
            return result

        } catch (error) {
            throw error
        }
    }


}
