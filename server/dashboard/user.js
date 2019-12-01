const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/:id', (req, res, next) => {
    if (!isNaN(req.params.id)) {
        queries.getUserByID(req.params.id)
            .then(user => {
                if (user) {
                    delete user.password
                    res.json(user);
                } else {
                    res.status(404);
                    next(new Error("User Not Found"))
                }
            })
            .catch(err => next(err))
    } else {
        res.status(500);
        next(new Error("Invalid ID!"))
    }
});




router.get('/doc', (req, res) => {
    queries.getAllDoc()
        .then(results => {
            if (results) {
                res.send(results);
            } else {
                res.send('No user with that ID found');
            }

        })
        .catch(err => next(err))
});



router.get('/availabilities', (req, res, next) => {
    queries.getAllAvailableApt()
        .then(results => {
            if (results) {
                results.rows.forEach(element => {
                    element['type'] = 'Available'
                    element['className'] = 'colorAvailable'
                    element['backgroundColor'] = '#00b33c'
                    element['textColor'] = '#ffffff'
                    element['allDay'] = false
                    element['title'] = "Available"

                })
                res.send(results.rows);
            } else {
                res.send(1)
            }
        })
        .catch(err => next(err))
})


module.exports = router;