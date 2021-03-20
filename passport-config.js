const LocalStrategy = require('passport-local').Strategy
const User = require('./src/models/User')
const passport = require('passport')
const bcrypt = require('bcrypt')

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {

    User.findOne({ username: username })
        .then((user) => {

            if (!user) { return done(null, false) }
            
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'Email or Password wrong' })
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});