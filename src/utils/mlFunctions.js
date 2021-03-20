const express = require('express')
var router = express.Router()
const Case = require('../models/Case')
const Blog = require('../models/Blog')
const CaseStudy = require('../models/CaseStudy')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middlewares/authenticateToken')

/**
 * @method - GET
 * @route - /ml/cases
 * @description - Get all cases for ML
 * @access - All 
 */
 router.get('/ml/cases', async (req, res) => {
    var allCases = await Case.find({}).lean()
    res.send(allCases)
})

/**
 * @method - POST
 * @route - /ml/cases/prediction
 * @description - Prediction of Files
 * @access - All 
 */
 router.post('/ml/cases/prediction', async (req, res) => {
    const prediction = req.body
    res.status(200).send(prediction)
})

/**
 * @method - GET
 * @route - /ml/starredCases
 * @description - Get all cases for ML
 * @access - All 
 */
 router.get('/ml/starredCases', async (req, res) => {
    var users = await User.find()
    var allStarred = []
    users.forEach((user) => {
        allStarred.push({ userId: user._id, starred: user.starredCases })
    })
    res.send(allStarred)
})

/**
 * @method - GET
 * @route - /ml/blogs
 * @description - Get all cases for ML
 * @access - All 
 */
 router.get('/ml/blogs', async (req, res) => {
    var allBlogs = await Blog.find({}).lean()
    res.send(allBlogs)
})

module.exports = router