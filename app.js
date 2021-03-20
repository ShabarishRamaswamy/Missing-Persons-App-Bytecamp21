// Dotenv
require('dotenv').config()

// Importing Required Modules
const express = require('express')
require('./src/db/mongoose')
const session = require('express-session')
const passport = require('passport')
const handlebars = require('express-handlebars');


// Declaring Variables
const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

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

// App config
app.use(authorityRouter)
app.use(blogRouter)
app.use(caseRouter)
app.use(caseStudyRouter)
app.use(userRouter)
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')

app.listen(PORT, ()=> {
    console.log('App running on port: ' + PORT)
})