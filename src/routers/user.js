const express = require('express')
var router = express.Router()
const Case = require('../models/Case')
const Blog = require('../models/Blog')
const CaseStudy = require('../models/CaseStudy')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const authentication = require('../middlewares/authentication')
const authenticateToken = require('../middlewares/authenticateToken')
const search = require('../utils/search')
const { urlencoded, json } = require("body-parser");
const { resolve } = require("path");
const { uploader, cloudinaryConfig } = require("../utils/cloudinaryConfig");
const { multerUploads, dataUri } = require('../middlewares/multerUpload');

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/', (req, res) => {
    if(req.session.accessToken){
        res.render('home.hbs')
    }else{
        res.redirect('/login')
    }
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
    res.redirect('/')
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
 * @route - /logout
 * @description - UserProfile
 * @access - All 
 */
 router.get('/logout', authenticateToken, async(req, res) => {
    await req.session.destroy()
    res.redirect('/')
})

/**
 * @method - GET
 * @route - /search/:query
 * @description - UserProfile
 * @access - All 
 */
 router.get('/search/:query', authenticateToken, search, async(req, res) => {
    res.send(req.results)
})

/**
 * @method - POST
 * @route - /user/avatar
 * @description - POST user avatar
 * @access - All 
 */
 router.post('/user/avatar', authenticateToken, multerUploads, async(req, res) => {
    try {
        // if(req.params.caseAuthority == req.user._id){}
          if (req.file) {
            const file = dataUri(req).content;
            return uploader
              .upload(file)
              .then(async(result) => {
                var image = result.url;
                console.log(image)
                req.user = image
                await req.user.save()
                return res
                  .status(200)
                  .send({ data: {image} })
              })
              .catch((err) =>{
                console.log(err)
                res.status(400).send()
              }
              );
          }else{
              res.status(400).send()
          }
      } catch (e) {
          console.log(e)
          res.status(500).send()
      }
})


module.exports = router