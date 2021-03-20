const User = require('../models/User')
const Case = require('../models/Case')
const Blog = require('../models/Blog')
const CaseStudy = require('../models/CaseStudy')

search = async(req, res, next) => {
    await User.createIndexes({ username: "text", phoneNumber: "text", username: "text" })

    await Case.createIndexes({ 
        caseNumber: "text", 
        investigatingDepartment: "text", 
        victimName: "text", 
        status: "text",
        caseAuthority: "text"
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

    var results = []
    // Finding from User
    results[0] = await User.find( { $text: { $search: req.params.query } } )

    
    // Finding from Case
    results[1] = (await Case.find( { $text: { $search: req.params.query } } ))

    
    // Finding from Blog
    results[2] = (await Blog.find( { $text: { $search: req.params.query } } ))

    
    // Finding from CaseStudy
    results[3] = (await CaseStudy.find( { $text: { $search: req.params.query } } ))
    
    req.results = results
    next()
}

module.exports = search