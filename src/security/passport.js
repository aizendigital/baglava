const { Strategy } = require('passport-local');
const userModel = require('../domain/user/user');
const passport = require('koa-passport');

passport.use(new Strategy(
    async function (email, password, cb) {
        let user = await userModel.getUserByEmail(email);
        if (user) {
            if (userModel.checkPassword(password, user)) {
                return cb(null, user);
            }
        }

        return cb(null, false);
    })
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(
    async function (id, cb) {
        let user = await userModel.getUserById(id);
        if(user){
            cb(null, user);
        }
        return cb(err);
    }
);

module.exports = passport;
