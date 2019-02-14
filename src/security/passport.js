const passport = require('koa-passport')
const userModel = require('../domain/user/user');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  console.log('serialize',user);
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  console.log('deserilize',id);

  let user = await userModel.getUserById(id, ['id', 'email']);
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
    console.log('strategy',{email , password});

    let user = await userModel.getUserByEmail(email, ['id', 'email', 'password' , 'created_at']);

    if (!user) {
      done(null, false, { message: 'no such user' })
    }
    if (user && await userModel.checkPassword(password, user)) {
      done(null, user);
    } else {

      done(null, false , { message : 'bad password'});
    }
  }))

module.exports = passport;