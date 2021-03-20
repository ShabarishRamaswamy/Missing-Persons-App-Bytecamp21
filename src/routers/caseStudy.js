const express = require('express')
var router = express.Router()
const CaseStudy = require('../models/CaseStudy')
const authenticateToken = require('../middlewares/authenticateToken')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/caseStudies', (req, res) => {
    res.send('Hello!')
})

/**
 * @method - POST || CREATE
 * @route - /userCaseStudy
 * @description - Creating User blog
 * @access - All 
 */
 router.post('/userCaseStudy', authenticateToken, async(req, res) => {
    try{
        var {
            events,
            description,
            status,
            officersInvolved,
            moreInfoLinks,
        } = req.body

        var newCase = new CaseStudy({
            userId: req.user._id,
            events,
            description,
            status,
            officersInvolved,
            moreInfoLinks,
        })
        await newCase.save()
        // console.log(user)
        res.status(200).redirect('/caseStudies')
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router