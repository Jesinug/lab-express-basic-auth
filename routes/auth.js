const express = require('express');
const User = require('../models/User.model.js');
const router = express.Router()


const bcrypt = require('bcryptjs');
const saltRound = 10;

//
router.get('/signup', (req, res) => {
    res.render('signup')
}) 


router.post('/signup',  (req, res) => {
    const { user, password } = req.body;
    res.render('signup');
/*
    if(!username || !password) {
        res.render('signup', { errorMessage: 'User and password are required'})
    }

    User.findOne({ $or: [{ username }, { password }]})
    .then((user) => {
        if(user) {
        res.render('signup', { errorMessage: 'User already exists'})
        }
    })

    const salt = bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    User.create({ username, password: hashPassword })
    .then(() => {
        res.render('index')
    })
    .catch((error) => next(error))
*/
}) 


router.get('/login', (req, res) => {
    res.render('login')
}) 

router.post('/login', (req, res) => {
    const { user, password } = req.body;
    res.render('login');
}) 



module.exports = router;