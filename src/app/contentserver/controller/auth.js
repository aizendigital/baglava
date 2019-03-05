'use strict';

const User = require('../../../domain/user/user');
const Company = require('../../../domain/company/company');

const userValidationSchema = require('../../../domain/user/validation');
const passport = require('../../../security/passport');

const Joi = require('joi');


class AuthController {
    
    constructor(connection) {
        this.connection = connection;
        this.userModel = new User(connection);
    }

    /**
     * Path: /fast_register
     * Method: POST
     * Desc: register user with email, password
     */

    async fastRegistration(ctx) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.fastRegister);
        if (result.error) ctx.throw(result.error);

        const [userExist, userError] = await this.userModel.checkExistUserByEmail(ctx.request.body.email);
        if (userError) ctx.throw(userError);

        if (userExist) ctx.throw('user exists');

        const [userId, registerError] = await this.userModel.fastRegister(ctx.request.body.email, ctx.request.body.password);
        if (registerError) ctx.throw(registerError);

        let [user, authError] = await this.userModel.getUserByEmail(ctx.request.body.email, ['id', 'email', 'password', 'created_at']);
        if (authError) ctx.throw(authError);

        ctx.login(user);

        ctx.body = { data: { userId: userId }, error: null };

    }

    /**
     * Path: /send_activation_link
     * Method: GET
     * Desc: send activation email to user
     */

    async sendActivationLink(ctx) {

        if (ctx.isAuthenticated()) {
            const [userId, userError] = await this.userModel.isUserActive(ctx.state.user.id);
            if (userId) { ctx.throw('user is active'); }

            //send email
            ctx.body = { data: { message: 'email successfully sent' }, error: null };
        } else {
            ctx.throw('not authorized');
        }

    }

    /**
    * Path: /activation
    * Method: POST
    * Desc: click on activation link from email
    */

    async clickActiveLink(ctx) {

        let result = Joi.validate(ctx.request.body, userValidationSchema.checkActivateToken);
        if (result.error) ctx.throw(result.error);

        let [userExist, userError] = await this.userModel.checkExistUserByEmail(ctx.request.body.email);
        if (userError) ctx.throw(userError);

        if (!userExist) ctx.throw('user does not exists');

        let [userInfo, tokenError] = await this.userModel.checkValidTokenExist(ctx.request.body.token);
        if (tokenError) ctx.throw(tokenError);

        if (!userInfo) ctx.throw('invalid token');

        [userInfo, userError] = await this.userModel.expireTokenAndActivate(userInfo.id, ctx.request.body.token);
        if (userError) ctx.throw(userError);

        ctx.body = { data: { message: 'successfully activated' }, error: null };

    }

    /**
     * Path: /resend_activation_link
     * Method: GET
     * Desc: resend activation email
     */

    async reSendActivationLink(ctx) {
        //TODO validate too many active link

        if (ctx.isAuthenticated()) {
            let [userId, userError] = await this.userModel.isUserActive(ctx.state.user.id);
            if (userId) { ctx.throw('user is active'); }

            [userId, userError] = await this.userModel.resetToken(ctx.state.user.id);
            if (userError) ctx.throw(userError);

            //TODO send email

            ctx.body = { data: { message: 'email successfully sent' }, error: null };
        } else {
            ctx.throw('not authorized');
        }

    }

    /**
     * Path: /reset_password_email
     * Method: POST
     * Desc: send reset password email
     */

    async sendResetPasswordEmail(ctx) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.resetPassword);
        if (result.error) ctx.throw(result.error);
        //TODO check too many reset password request
        let [user, error] = await this.userModel.checkExistUserByEmail(ctx.request.body.email);
        if (error) ctx.throw(error);
        if (!user) ctx.throw('user does not exists');

        [user, error] = await this.userModel.resetToken(user.id);
        if (error) ctx.throw(error);

        //send email

        ctx.body = { data: { message: 'reset password email sent' }, error: null };

    }

    /**
     * Path: /set_new_password
     * Method: POST
     * Desc: set new password
     */

    async setNewPassword(ctx) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.setPassword);
        if (result.error) ctx.throw(result.error);

        let [user, error] = await this.userModel.checkExistUserByEmail(ctx.request.body.email);
        if (error) ctx.throw(error);
        if (!user) ctx.throw('user does not exists');

        let [auth, authError] = await this.userModel.checkPassword(ctx.request.body.password, user);
        if (authError) ctx.throw(authError);

        if (auth) ctx.throw('this is not new password');

        let [userId, userError] = await this.userModel.checkValidTokenExist(ctx.request.body.token);
        if (userError) ctx.throw(userError);

        if (!userId) ctx.throw('invalid token');

        [userId, userError] = await this.userModel.restPassword(ctx.request.body.email, ctx.request.body.password);
        if (userError) ctx.throw(userError);

        ctx.body = { data: { message: 'password reset successfully' }, error: null };

    }

    async isAuthenticated(ctx, next) {
        if (ctx.isAuthenticated()) {
            const [userId, userError] = await this.userModel.isUserActive(ctx.state.user.id);
            if (userId) { return next(); } else { ctx.throw('user is not active'); }
        }

        ctx.throw('not authorized');
    }

    async isNotAuthenticated(ctx, next) {
        console.log('is not auth')
        if (ctx.isAuthenticated()) ctx.throw('user must be logged out first!');
        return next();
    }

    async logout(ctx) {
        ctx.logout();
        ctx.body = { data: { message: 'successfully logged out' }, error: null };
    }

    async login(ctx) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.fastRegister);
        if (result.error !== null) {
            ctx.throw(result.error);
        }

        return passport.authenticate('local', (err, user, info, status) => {
            if (user === false) {
                ctx.throw(401, new Error(info.message));//TODO 
            } else {
                ctx.login(user);
                ctx.body = { data: { message: 'successfully logged in' }, error: null };
            }
        })(ctx)
    }

}

module.exports = AuthController;