const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const authoritySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    updates: {
        type: [String],
        required: true
    },
    officers: {
        type: [String],
        required: false
    },
    hotlineNumber:{
        type: String,
        required: true
    },
    cases: {
        type: [String],
        required: false
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('authority', authoritySchema)