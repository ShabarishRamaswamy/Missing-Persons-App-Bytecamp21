const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const blogSchema = new Schema({
    user: {
        type: String,
        required: true
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
        enum: ["statusUpdate"]
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('blog', blogSchema)