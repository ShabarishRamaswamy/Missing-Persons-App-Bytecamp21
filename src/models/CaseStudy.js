const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const CaseStudySchema = new Schema({
    events: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['solved', 'ongoing', 'closed'],
        required: true
    },
    officersInvolved: {
        type: [String],
        required: false,
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