const User = require('../models/User')
const Case = require('../models/Case')
const Blog = require('../models/Blog')
const CaseStudy = require('../models/CaseStudy')

search = async(req, res, next) => {
    var results = []
    await User.createIndexes({ username: "text", phoneNumber: "text" })

    await Case.createIndexes({ 
        caseNumber: "text", 
        investigatingDepartment: "text", 
        victimName: "text", 
        status: "text"
    })

    await Blog.createIndexes({
        content: "text", 
        scope: "text",
    })

    await CaseStudy.createIndexes({ 
        events: "text", 
        description: "text", 
        status: "text", 
        officersInvolved: "text",
    })

    // Finding from User
    results[0] = await User.find( { $text: { $search: req.params.query } } )

    // Finding from Case
    results[1] = await Case.find( { $text: { $search: req.params.query } } )

    
    // Finding from Blog
    results[2] = await Blog.find( { $text: { $search: req.params.query } } )

    
    // Finding from CaseStudy
    results[3] = await CaseStudy.find( { $text: { $search: req.params.query } } )

    // Search from Cases
    var userCase = await Case.find({})
    userCase.forEach((userCase) => {
        if(userCase.investigatingDepartment.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.victimName.indexOf(req.params.query) !== -1){
            // console.log(userCase.victimName)
            results.push(userCase)
        }else if(userCase.status.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.status.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.typeOfCase.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }
    })

    // Search from Blogs
    var userBlog = await Blog.find({})
    userBlog.forEach((userBlog) => {
        if(userBlog.title.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.content.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.scope.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }
    })

    // Search from Blogs
    var caseStudy = await CaseStudy.find({})
    caseStudy.forEach((caseStudy) => {
        if(caseStudy.events.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.description.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }else if(userCase.status.indexOf(req.params.query) !== -1){
            results.push(userCase)
        }
    })
    
    req.results = results
    next()
}

module.exports = search