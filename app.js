// Dotenv
require('dotenv').config()

// Importing Required Modules
const express = require('express')
require('./src/db/mongoose')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
require('./src/utils/cloudinaryConfig')
const cloudinary = require("cloudinary").v2;

// Declaring Variables
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(passport.initialize());
// app.use(passport.session());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.set('view-engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));


// Routers
const authorityRouter = require('./src/routers/authority')
const blogRouter = require('./src/routers/blog')
const caseRouter = require('./src/routers/case')
const caseStudyRouter = require('./src/routers/caseStudy')
const userRouter = require('./src/routers/user')
const starRouter = require('./src/utils/starStuff')
const mlRouter = require('./src/utils/mlFunctions')

// App config
app.use(authorityRouter)
app.use(blogRouter)
app.use(caseRouter)
app.use(caseStudyRouter)
app.use(userRouter)
app.use(starRouter)
app.use(mlRouter)
// require('./passport-config')


app.listen(PORT, ()=> {
    console.log('App running on port: ' + PORT)
})