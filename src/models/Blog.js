const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const blogSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        text: true
    },
    content: {
        type: String,
        required: true,
        text: true
    },
    isAuthority: {
        type: Boolean,
        default: false,
        required: true
    },
    isOfficialBlog: {
        type: Boolean,
        default: false,
        required: false
    },
    scope:{
        type: String,
        required: true,
        enum: ["statusUpdate"],
        text: true
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('blog', blogSchema)