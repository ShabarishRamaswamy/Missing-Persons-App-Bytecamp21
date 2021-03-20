const LocalStrategy = require('passport-local').Strategy
const User = require('./src/models/User')
const passport = require('passport')
var bcrypt = require('bcrypt')

// const customFields = {
//     usernameField: 'email',
//     passwordField: 'password'
// };

// verifyCallback = async(username, password, done) => {
//     User.findOne({ username: username })
//         .then((user) => {
//             if (!user) { return done(null, false) }
            
//             var passwordsMatch = bcrypt.compare(password, user.password)
//             .then((result) => {
//                 if(result){
//                     console.log('User Authenticated')
//                     return done(null, user)
//                 }else{
//                     return done(null, false, { message: 'Email or Password wrong' })
//                 }
//             })
//         })
//         .catch((err) => {   
//             done(err);
//         });
// }

// const strategy  = new LocalStrategy(customFields, verifyCallback);

// passport.use(strategy);

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {
//     User.findById(userId)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch(err => done(err))
// });


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
      const user = await getUserByEmail(email)
    //   console.log(user)
      if (user == null) {
        return done(null, false, { message: 'User or Password Error' })
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'User or Password Error' })
        }
      } catch (e) {
        return done(e)
      }
    }
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
      return done(null, getUserById(id))
    })
  }
  
  module.exports = initialize