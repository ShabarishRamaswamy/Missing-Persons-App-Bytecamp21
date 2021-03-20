const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const mlSchema = new Schema({
    prediction: {
        type: [String]
    },
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('ml', mlSchema)