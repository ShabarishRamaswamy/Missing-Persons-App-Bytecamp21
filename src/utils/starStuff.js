const express = require('express')
var router = express.Router()
const Case = require('../models/Case')
const Blog = require('../models/Blog')
const CaseStudy = require('../models/CaseStudy')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const authenticateToken = require('../middlewares/authenticateToken')

/**
 * @method - POST
 * @route - /star/case/:id
 * @description - Stars a Case
 * @access - All 
 */
 router.post('/star/case/:id', authenticateToken, async(req, res) => {
     try{
        const starCase = await Case.findById(req.params.id)
        req.user.starredCases.push(starCase._id)
        await user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send()
    }
})

/**
 * @method - POST
 * @route - /star/caseStudy/:id
 * @description - Stars a Case Study
 * @access - All 
 */
 router.post('/star/caseStudy/:id', authenticateToken, async(req, res) => {
    try{
       const starCaseStudy = await CaseStudy.findById(req.params.id)
       req.user.starredCaseStudies.push(starCaseStudy._id)
       await user.save()
       res.status(200).send()
   }catch(e){
       res.status(500).send()
   }
})

/**
 * @method - POST
 * @route - /star/blog/:id
 * @description - Stars a Blog
 * @access - All 
 */
 router.post('/star/blog/:id', authenticateToken, async(req, res) => {
    try{
       const starBlog = await Blog.findById(req.params.id)
       req.user.starredBlogs.push(starBlog._id)
       await user.save()
       res.status(200).send()
   }catch(e){
       res.status(500).send()
   }
})

/**
 * @method - GET
 * @route - /user/starred
 * @description - Get array of Starred stuff of User
 * @access - All 
 */
 router.get('/user/starred', authenticateToken, async(req, res) => {
    try{
       const starredStuff = {
           cases: req.user.starredCases,
           caseStudies: req.user.starredCaseStudies,
           blogs: req.user.starredBlogs,
       }
       res.status(200).send(starredStuff)
   }catch(e){
       res.status(500).send()
   }
})

module.exports = router