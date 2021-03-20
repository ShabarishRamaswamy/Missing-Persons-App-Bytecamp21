const express = require('express')
var router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const authentication = require('../middlewares/authentication')
const authenticateToken = require('../middlewares/authenticateToken')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/', (req, res) => {
    res.render('home.hbs')
})

/**
 * @method - GET
 * @route - /register
 * @description - Registration Page
 * @access - All 
 */
router.get('/register', (req, res) => {
    res.render('signup.hbs', {
        layout: 'register'
    })
})


/**
 * @method - POST
 * @route - /register
 * @description - Required information about users are pushed into the db as User instance.
 * @access - All 
 */
router.post('/register', async(req, res) => {
    try{
        var {
            username,
            age,
            email,
            password,
            phoneNumber,
            isAuthority
        } = req.body

        var hashedPassword = await bcrypt.hash(password, 10)

        var user = new User({
            username,
            email,
            age,
            phoneNumber,
            password: hashedPassword,
            isAuthority
        })

        await user.save()
        // console.log(user)
        res.redirect('/login')
        res.send('Registered')
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})


/**
 * @method - GET
 * @route - /login
 * @description - Login Page
 * @access - All 
 */
router.get('/login', (req, res) => {
    res.render('login.hbs', {
        layout: 'register'
    })
})


/**
 * @method - GET
 * @route - /login
 * @description - Login Page
 * @access - All 
 */
router.post('/login', authentication, (req, res) => {
    if(!req.session.accessToken){
        res.status(403).send("Unauthorized")
    }
    // console.log(req.session.accessToken)
    res.status(201).send("Logged in")
})

/**
 * @method - GET
 * @route - /profile
 * @description - UserProfile
 * @access - All 
 */
 router.get('/profile', authenticateToken, (req, res) => {
    res.send(req.user)
})

module.exports = router