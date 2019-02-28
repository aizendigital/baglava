const passport = require('koa-passport')
const User = require('../domain/user/user');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  userModel = new User(global.db);
  let [user, error] = await userModel.getUserById(id, ['id', 'email', 'active']);
  if (error) done(error);
  if (user) {
    done(null, user);
  } else {
    done(new Error('user not found'))
  }

})

passport.use(new LocalStrategy({
  usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password'
},
  async function (email, password, done) {
    userModel = new User(global.db);

    let [user, error] = await userModel.getUserByEmail(email, ['id', 'email', 'active', 'password', 'created_at']);
    if (error) done(error);
    if (!user) {
      done(null, false, { message: 'no such user' })
    }
    if (!user.active) {
      done(null, false, { message: 'user is not active' });
    }
    let [auth , authError] = await userModel.checkPassword(password, user);
    if (authError) done(authError);
    if (auth) {
      done(null, user);
    } else {

      done(null, false, { message: 'bad password' });
    }
  }))

module.exports = passport;