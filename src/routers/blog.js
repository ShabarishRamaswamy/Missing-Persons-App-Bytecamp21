const express = require('express')
var router = express.Router()
const authenticateToken = require('../middlewares/authenticateToken')
const Blog = require('../models/Blog')

/**
 * @method - GET
 * @route - /userBlog
 * @description - User Blogs
 * @access - All 
 */
router.get('/userBlog', authenticateToken, (req, res) => {
    res.send('Hello!')
})

/**
 * @method - POST
 * @route - /userBlog
 * @description - Creating User blog
 * @access - All 
 */
 router.get('/userBlog', authenticateToken, async(req, res) => {
    try{
        var {
            content,
            isAuthority,
            isOfficialBlog,
            scope
        } = req.body

        var blog = new Blog({
            userId: req.user._id,
            content,
            isAuthority,
            isOfficialBlog,
            scope
        })

        await blog.save()
        // console.log(user)
        res.redirect('/blogs')
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - GET
 * @route - /blogs
 * @description - All Blogs
 * @access - All 
 */
 router.get('/blogs', authenticateToken, (req, res) => {
    if(req.user){
        
    }
})

module.exports = router