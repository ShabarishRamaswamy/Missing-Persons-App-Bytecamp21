const express = require('express')
var router = express.Router()

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/register', (req, res) => {
    res.render('register.hbs')
})

router.post('/register', (req, res) => {
    try{
        var {
            username,
            age,
            email,
            password,
            phoneNumber,
            isAuthority
        } = req.body

    }catch(e){
        console.log(e)
        res.status(500).send()
    }

})

module.exports = router