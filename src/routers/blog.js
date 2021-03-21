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
            return res.render('blogs.hbs', {
                allBlogs
            })
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
            title,
            content,
            isOfficialBlog,
            scope
        } = req.body

        var blog = new Blog({
            userId: req.user._id,
            title,
            content,
            isAuthority: req.user.isAuthority,
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
    var blog = Blog.findById(req.params.id)
    if(blog.userId === req.user._id){
        try{
            var {
                title,
                content,
                isOfficialBlog,
                scope
            } = req.body
    
            var blog = Blog.findById(req.params.id)

            if(title)
            blog.title = title,
            blog.content = content,
            blog.isOfficialBlog = isOfficialBlog,
            blog.scope = scope

            await blog.save()

            return res.status(200).send()
        }catch(e){
            console.log(e)
            res.status(500).send()
        }
    }else{
        console.log(e)
        res.status(500).send()
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
 router.patch('/blogs/:id', authenticateToken, async(req, res) => {
    if(req.user){
        const allBlogs = await Blog.findById(req.params.id)
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

            if(allBlogs.userId == req.user._id){
                await allBlogs.save()
                res.status(200)
                res.redirect('/blogs')
            }else{
                res.status(400).redirect('/blogs')
            }
        }catch(e){
            console.log(e)
            res.status(500).send()
        }
    }
})


router.get('/blogs', authenticateToken, async(req, res) => {
    try{
        const allBlogs = await Blog.find({})
        res.render("blogs.hbs", {
            allBlogs,
        });
    }catch(e){

    }
})

module.exports = router