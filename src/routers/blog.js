const express = require('express')
var router = express.Router()

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/blog', (req, res) => {
    res.send('Hello!')
})

module.exports = router