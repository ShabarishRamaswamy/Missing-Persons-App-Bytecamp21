// Importing required libraries
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticateToken = async(req, res, next) => {
    const token = req.session.accessToken
    if(!token){
        console.log('No Token')
        return res.status(400).send()
    }
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async(err, user) => {
        if(err){
            return res.status(403).send(err)
        }
        const tempUser = await User.findOne({ email: user.email })
        req.user = tempUser
        res.status(200)
        next()
    })
}

module.exports = authenticateToken