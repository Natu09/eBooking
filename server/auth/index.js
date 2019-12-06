const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../db/queries')

// routes 

router.get('/', (req, res) => {
    res.json({
        message: "hello"
    });
});

function validUser(user) {
    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';

    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 4;

    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if (validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user)
                if (!user) {
                    bcrypt.hash(req.body.password, 6) // hash password
                        .then((hash) => {
                            res.json({
                                hash,
                                message: "hello hash",
                            })
                            // insert 
                            const user = {
                                fname: req.body.fname,
                                lname: req.body.lname,
                                email: req.body.email,
                                password: hash,
                                // created_at: new Date()
                            }
                            User
                                .addUser2(user)
                                .then(response => {
                                    res.json({
                                        temp: response,
                                        message: "hello hash"
                                    })
                                })
                        }); // then this is a unique email
                } else {
                    next(new Error("Email in use"));
                }
            })
    }
    else {
        next(new Error("invalid user"));
    }
});


router.post('/login', (req, res, next) => {
    if (validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                // console.log('user', user)
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then((result) => {
                            // if the passwords match
                            if (result) {
                                // setting the 'set-cooking'
                                res.cookie('user_id', user.userid, {
                                    httpOnly: true,
                                    secure: false,
                                    signed: true
                                })
                                res.json({
                                    id: user.userid,
                                    message: "Logged in!"
                                })
                            } else {
                                next(new Error("invalid login 1"));
                            }
                        })
                } else {
                    next(new Error("invalid login 2"));
                }
            })
            .catch(err => next(err))
    } else {
        next(new Error("invalid login 3"));
    }
});


module.exports = router