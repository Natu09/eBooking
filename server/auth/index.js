const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../db/queries')

// routes 

router.get('/', (req, res) => {
    res.json({
        message: "hello"
    })
})

function validUser(user) {
    const validEmail = typeof user.email == 'string' && 
                        user.email.trim() != '';
                        
    const validPassword = typeof user.password == 'string' && 
                        user.email.trim() != '' && 
                        user.password.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user)
                if(!user) {
                    bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        // insert 
                        const user = {
                            email: req.body.email,
                            password: hash,
                            created_at: new Date()
                        }
                        User
                            .create(user)
                            .then(id => {
                                res.json({
                                    ids, 
                                    message: "hello hash"
                                })
                            })
                    });
                   res.send("good email") // then this is a unique email
                } else {
                    next(new Error("Email in use"));
                }
                res.json({
                    user,
                    message: "hello"
                })
            })
    }
    else {
        next(new Error("invalid user"));
    }
});


router.post('/login', (req, res, next) => {
    if(validUser(req.body)){
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log('user', user)
                if(user) {
                    bcrypt
                    .compare(req.boddy.password, user.password)
                    .then((result) => {
                        // match
                        if(result) {
                            res.cookie('user_id', user.id, {
                                httpOnly: true,
                                secure: true, 
                                signed: true
                            })
                            res.json({
                                result,
                                message: "Logged in!"
                            })
                        } else {
                            next(new Error("invalid login"));
                        }
                    })
                } else {
                    next(new Error("invalid login"));
                }
            })
    } else {
        next(new Error("invalid login"));
    }
});


module.exports = router