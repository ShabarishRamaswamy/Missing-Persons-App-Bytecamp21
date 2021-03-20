const express = require('express')
var router = express.Router()
const authenticateToken = require('../middlewares/authenticateToken')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 * @access - All 
 */
router.get('/blog', authenticateToken, (req, res) => {
    res.send('Hello!')
})

module.exports = router