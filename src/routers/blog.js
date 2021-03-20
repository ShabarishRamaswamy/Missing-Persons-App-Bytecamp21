const express = require('express')
var router = express.Router()
const authenticateToken = require('../middlewares/authenticateToken')
const Blog = require('../models/Blog')

/**
 * @method - GET || READ
 * @route - /userBlog
 * @description - User Blogs
 * @access - All 
 */
router.get('/userBlogs', authenticateToken, async(req, res) => {
    try{
        const allBlogs = await Blog.find({ userId: req.user._id })
        if(!allBlogs){
            return res.send("You don't have any blogs")
        }else{
            return res.status(200).send(allBlogs)
        }
    }catch(e){
        console.log(e)
        res.redirect('/blogs')
    }
})

/**
 * @method - POST || CREATE
 * @route - /userBlog
 * @description - Creating User blog
 * @access - All 
 */
 router.post('/userBlog', authenticateToken, async(req, res) => {
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
 * @method - PATCH || UPDATE
 * @route - /blog/:id
 * @description - Updating Blog
 * @access - Blog Owner
 */
 router.patch('/blog/:id', authenticateToken, async(req, res) => {
    if(req.user){
        const blog = await Blog.find({ userId: req.params.id })


        return res.status(200).send(allBlogs)
    }
})

/**
 * @method - DELETE
 * @route - /blog/:id
 * @description - Delete selected blog
 * @access - Owner of Blog
 */
 router.delete('/blog/:id', authenticateToken, async(req, res) => {
        const blog = await Blog.findById(req.params.id)
        if(req.user._id == blog.userId){
            await Blog.findByIdAndDelete(req.params.id)
            return res.status(200).send(blog)
        }else{
            return res.status(401).send("Unauthorized")
        }
})


/**
 * @method - GET || READ
 * @route - /blogs
 * @description - All Blogs
 * @access - All
 */
 router.get('/blogs', authenticateToken, async(req, res) => {
    if(req.user){
        const allBlogs = await Blog.find({})
        try{
            var {
                content,
                isOfficialBlog,
                scope
            } = req.body

                if(content)
                blog.content = content

                if(isOfficialBlog)
                blog.isOfficialBlog = isOfficialBlog

                if(scope)
                blog.scope = scope

            await blog.save()
            // console.log(user)
            res.redirect('/userBlogs')
        }catch(e){
            console.log(e)
            res.status(500).send()
        }
    }
})

module.exports = router