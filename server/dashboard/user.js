const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

const authMiddleware = require('../auth/middleware')
const asyncer = require('async')

router.get('/:id', authMiddleware.allowAccess, (req, res, next) => {
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




router.get('/doc/:id', authMiddleware.allowAccess, (req, res) => {
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



router.get('/availabilities/:id', authMiddleware.allowAccess, (req, res, next) => {
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
                res.send([])                     // Need to fix this later on
            }
        })
        .catch(err => next(err))
})

router.get('/appointments/:id', authMiddleware.allowAccess, (req, res, next) => {
    queries.getAllApt(req.params.id)
        .then(results => {
            if (results) {
                results.rows.forEach(element => {
                    element['type'] = 'Booked'
                    element['className'] = 'colorBooked'
                    element['backgroundColor'] = '#0066ff'
                    element['textColor'] = '#ffffff'
                    element['allDay'] = false
                    element['title'] = "Your Appointment"

                })
                res.send(results.rows);
            } else {
                res.send([])                     // Need to fix this later on
            }
        })
        .catch(err => next(err))
})



// function eventFormatter(events, type) {
//     events.forEach(element => {
//         element['textColor'] = '#ffffff'
//         element['allDay'] = false
//         if (type) {
//             element['type'] = 'Booked'
//             element['className'] = 'colorBooked'
//             element['backgroundColor'] = '#0066ff'
//             element['title'] = "Booked Appointment"
//         } else {
//             element['type'] = 'Available'
//             element['className'] = 'colorAvailable'
//             element['backgroundColor'] = '#00b33c'
//             element['title'] = "Available"
//         }
//     })

//     return events
// }

// router.get('/:id/events', async (req, res, next) => {
//     let available_apt = await queries.

// });


module.exports = router;