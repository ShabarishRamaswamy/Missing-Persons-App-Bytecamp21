const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const CaseStudySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    events: {
        type: String,
        required: true,
        text: true
    },
    description: {
        type: String,
        required: true,
        text: true
    },
    status:{
        type: String,
        enum: ['solved', 'ongoing', 'closed'],
        required: true,
        text: true
    },
    officersInvolved: {
        type: [String],
        required: false,
        text: true
    },
    moreInfoLinks: {
        type: [String],
        required: false
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('caseStudy', CaseStudySchema)