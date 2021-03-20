const express = require('express')
var router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/register', (req, res) => {
    res.render('register.hbs')
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

        const salt = await bcrypt.genSaltSync()
        var hashedPassword = await bcrypt.hashSync(password, salt)

        var user = new User({
            username,
            age,
            email,
            password: hashedPassword,
            phoneNumber,
            isAuthority
        })

        await user.save()
        // console.log(user)
        // res.redirect('/login')
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
    res.render('login.hbs')
})

/**
 * @method - GET
 * @route - /login
 * @description - Login Page
 * @access - All 
 */
 router.post('/login', async(req, res) => {
    // res.render('login.hbs')
    try{
        var {
            email,
            password
        } = req.body
        
        await user.save()
        // console.log(user)
        // res.redirect('/login')
        res.send('Registered')
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})


module.exports = router