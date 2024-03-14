import passport from 'passport'
import LocalStrategy from 'passport-local'
// import { findUser } from './db'
import { checkUser, findUser } from './user'

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username)
})

passport.deserializeUser(function (req, id, done) {
  // deserialize the username back into user object
  const user = findUser(id)
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      checkUser(username, password, req.body.validationcode)
        .then((user) => {
          done(null, user)
        })
        .catch((error) => {
          done(error)
        })
    },
  ),
)

export default passport
