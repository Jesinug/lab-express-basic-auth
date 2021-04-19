const express = require('express');
const User = require('../models/User.model.js');
const router = express.Router()


const bcrypt = require('bcryptjs');
const saltRound = 10;

//Pintando el formulario de alta de usuario
router.get('/signup', (req, res) => {
    res.render('signup')
})

//Recibiendo los datos de alta de usuario que contiene el formulario
router.post('/signup', (req, res) => {
    const {
        username,
        password
    } = req.body;

    //generando la condición para anticipar el caso de uso: "el nuevo usuario 
    //no cargó username o password" y en caso true, enviar mensaje de error
    if (!username || !password) {
        res.render('signup', {
            errorMessage: 'User and password are required'
        })
    }


    //generando la condición para anticipar el caso de uso: "el nuevo usuario 
    // cargó un username ya existente" y en caso true, enviar mensaje de error
    User.findOne({
            username
        })
        .then((user) => {
            if (user) {
                res.render('signup', {
                    errorMessage: 'User already exists'
                })
            }


            //definiendo el criterio de encriptación
            const salt = bcrypt.genSaltSync(saltRound);
            //procediendo con la encriptación
            const hashPassword = bcrypt.hashSync(password, salt);

            User.create({
                    username,
                    password: hashPassword
                })
                .then(() => 
                    res.render('index'))
                    .catch((error) => res.render 
                        ('signup', {errorMessage: 'User'})
                    )
                
                .catch((error) => next(error))
        })
})

//Pintando el formulario de login de usuario
router.get('/login', (req, res) => {
    res.render('login')
})
//Recibiendo los datos de login usuario que contiene el formulario
router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    //generando la condición para anticipar el caso de uso: "el usuario 
    //no ingresó username o password" y en caso true, enviar mensaje de error   
    if (!username || !password) {
        res.render('login', {
            errorMessage: 'User and password are required'
        })
    }

    //generando la condición para anticipar el caso de uso: "el usuario 
    //ingresó username o password incorrectos" y en caso true, enviar mensaje de error
    User.findOne({ username })
    .then(user => {
        if(!user) {
            res.render('login', {
                errorMessage: 'Incorrect user or password'
            })

        }
        const passwordCorrect = bcrypt.compareSync(password, user.password);
        if(passwordCorrect) {
            req.session = user;
            res.redirect('/profile')
        }
    })

})


module.exports = router;