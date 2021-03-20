const express = require('express')
var router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('../../passport-config')
initializePassport(
    passport,
    getUserByEmail = async(email) => { 
        const user = await User.findOne({email: email})
        return user
    },
    getUserById = async(id) => { 
        const user =  await User.findById(id)
        return user
    }
)

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/register', (req, res) => {
    res.render('./../../views/signup.hbs', {
        layout: 'register'
    })
})

router.get('/', (req, res) => {
    console.log(req.user)
    if(req.isAuthenticated()){
        res.send(req.user)
    }else{
        // res.redirect('/login')
        console.log('Not Authenticated')
        res.send('Not Authenticated')
    }
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

router.get('/register', (req, res) => {
    res.render('./../../views/login.hbs', {
        layout: 'register'
    })
})


/**
 * @method - GET
 * @route - /login
 * @description - Login Page
 * @access - All 
 */
//  router.post('/login', async(req, res) => {
//     // res.render('login.hbs')
//     try{
//         var {
//             email,
//             password
//         } = req.body

//         await user.save()
//         // console.log(user)
//         // res.redirect('/login')
//         res.send('Registered')
//     }catch(e){
//         console.log(e)
//         res.status(500).send()
//     }
// })

router.post('/login', passport.authenticate('local'), (req, res) => {
    if(req.isAuthenticated()){
        console.log(req.body)
        res.send(req.user)
    }else{
        res.send("Not")
    }
})


module.exports = router