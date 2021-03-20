const express = require('express')
var router = express.Router()
const Case = require('../models/Case')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/case', (req, res) => {
    res.send('Hello!')
})

/**
 * @method - POST
 * @route - /case
 * @description - The Homepage
 * @access - All 
 */
 router.post('/case', (req, res) => {
    try{
        var {
        caseNumber, // Case Number assigned by the Authority.
        city,
        state,
        postalCode,
        date,
        investigatingDepartment,
        update,
        victimMaritalStatus,
        victimName,
        victimGender,
        reward,
        victimInfo,
        victimAge,
        status,
        officersInvolved,
        moreInfoLinks,
        victimImage
        } = req.body

        const newCase = new Case({
            caseNumber,
            location: { 
                city,
                state,
                postalCode
            },
            date,
            investigatingDepartment,
            updates: [update],
            victimMaritalStatus,
            victimName,
            victimGender,
            reward,
            victimInfo,
            victimAge,
            status,
            officersInvolved,
            moreInfoLinks,
            victimImage
        })
        res.status(201).send(newCase)
    }catch(e){
        res.send(400).send()
    }
})

/**
 * @method - GET
 * @route - /cases
 * @description - Get all cases
 * @access - All 
 */
 router.get('/cases', async(req, res) => {
    var allCases = await Case.find()
    res.send(allCases)
})

/**
 * @method - GET
 * @route - /case/caseID
 * @description - Get all cases
 * @access - All 
 */
//  router.get('/cases/:id', async(req, res) => {
//     var allCases = await Case.find()
//     res.send(allCases)
// })


module.exports = router