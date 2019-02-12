const passport = require('koa-passport')
const userModel = require('../domain/user/user');


passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {

  let user = await userModel.getUserById(id, ['id', 'email']);
  if (user) {
    done(null, user);
  } else {
    done(new Error('user not found'))
  }

})

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
  usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password'
},
  async function (email, password, done) {

    let user = await userModel.getUserByEmail(email, ['id', 'email', 'password']);
    console.log(user);

    if (!user) {
      done(null, false)
    }
    if (user && await userModel.checkPassword(password, user)) {

      done(null, user);
    } else {

      done(null, false);
    }
  }))

module.exports = passport;