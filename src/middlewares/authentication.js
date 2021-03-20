const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

userLogin = async(req, res, next) => {
    var {
        email,
        password,
    } = req.body
    // console.log(req.body.email, req.body.password)

    const user = await User.findOne({ email })
    // console.log(user)
    if(!user){
        return res.status(404).send('Cannot Find User')
    }
    try{
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send('Cannot Find User')
        }
        var accessTokenUser = {
            username: user.username,
            email: user.email
        }
        const accessToken = jwt.sign(JSON.stringify(accessTokenUser), process.env.JWT_SECRET_TOKEN)

        req.session.accessToken = accessToken
        res.status(200)
        next()
    }catch(e){
        console.log(e)
        return res.status(500).send()
    }
}

module.exports = userLogin