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

module.exports = router