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

/**
 * @method - GET || READ
 * @route - /userCaseStudies
 * @description - The Homepage
 * @access - All 
 */
 router.get('/userCaseStudies', authenticateToken, async(req, res) => {
    const userCaseStudies = await CaseStudy.find({ userId: req.user._id })
    res.status(200).send(userCaseStudies)
})


/**
 * @method - PATCH || UPDATE
 * @route - /userCaseStudy/:id
 * @description - Updating the case study
 * @access - All 
 */
 router.patch('/userCaseStudy/:id', authenticateToken, async(req, res) => {
    const caseStudy = CaseStudy.findById(req.params.id)
    if(caseStudy.userId == req.user._id){
        try{
            var {
                events,
                description,
                status,
                officersInvolved,
                moreInfoLinks,
            } = req.body
            
            if(events)
            caseStudy.events = events

            if(description)
            caseStudy.description = description

            if(status)
            caseStudy.status = status

            if(officersInvolved)
            caseStudy.officersInvolved = officersInvolved

            if(moreInfoLinks)
            caseStudy.moreInfoLinks = moreInfoLinks
            await caseStudy.save()
            // console.log(user)
            res.status(200).redirect('/userCaseStudies')
        }catch(e){
            console.log(e)
            res.status(500).send()
        }
    }else{
        res.status(401).send()
    }
})

/**
 * @method - DELETE
 * @route - /caseStudy/:id
 * @description - Delete selected Case Study
 * @access - Owner of Case Study
 */
 router.delete('/caseStudy/:id', authenticateToken, async(req, res) => {
    const caseStudy = await CaseStudy.findById(req.params.id)
    if(req.user._id == caseStudy.userId){
        await CaseStudy.findByIdAndDelete(req.params.id)
        return res.status(200).send(caseStudy)
    }else{
        return res.status(401).send()
    }
})

module.exports = router