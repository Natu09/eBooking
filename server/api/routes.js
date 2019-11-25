const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
// const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    // List all users and put their emails in an array
    queries.getAllUsers()
        .then(results => {
            let emails = []
            for (var i = 0; i < results.length; i++) {
                emails.push(results[i].email)
            }
            res.send(emails);
        })
})


function isValidID(req, res, next) {
    if (!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}


router.get('/:id', isValidID, (req, res, next) => {
    queries.getUserByID(req.params.id)
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                next()
            }
        })
})

router.get('/failed', (req, res) => {
    res.send('Something is wrong with your form =(');
})


async function isValidPassword(req, res, next) {
    try {
        if (req.body.password.length < 6) {
            // Do something where password is less than 6 characters
            console.log("Password not OK")
            return res.redirect('/failed');
        }
        return next()

    } catch (e) {
        return next(e)
    }
}


// // Dummy admin sign-Up 
// router.post('/', isValidPassword, async (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hashedPass => {
//             queries.addAdmin(req.body.username, hashedPass)
//         })
//         .then(results => {
//             res.send(results);
//         })
//         .catch(err => next(err))

// });



// router.put('/:id', isValidID, (req, res, next) => {
//     const now = new Date()
//     queries.updateDOB(req.params.id, req.body)
//         .then(results => {
//             res.send(results)
//         })
//         .catch(err => next(err))

// })



module.exports = router;