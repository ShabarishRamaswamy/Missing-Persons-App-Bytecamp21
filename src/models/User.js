const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        text: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(validator.isEmail(value) === false){
                throw new Error("Please provide a valid Email ID")
            }
        }
    },
    password:{
        type: String,
        required: true
    },
    emailConfirmed: {
        type: Boolean,
        default: false,
        required: true,
    },
    emailValidationHash: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        unique: true,
        text: true
    },
    isAuthority: {
        type: Boolean,
        default: false
    },
    starredCases: {
        type: [String],
        required: true
    },
    starredCaseStudies: {
        type: [String],
        required: true
    },
    starredBlogs: {
        type: [String],
        required: true
    }
},{ 
    timestamps: true 
} 
)

module.exports = mongoose.model('user', UserSchema)