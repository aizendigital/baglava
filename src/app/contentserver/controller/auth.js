'use strict';

const User = require('../../../domain/user/user');
const Company = require('../../../domain/company/company');

const userValidationSchema = require('../../../domain/user/validation');
const passport = require('../../../security/passport');

const Joi = require('joi');


class AuthController {

    /**
     * Path: /login
     * Method: GET
     * Desc: get login page
     */

    async getLogin(ctx, next) {
        console.log(ctx.isAuthenticated());
        if (ctx.isAuthenticated()) {
            ctx.redirect('/');
        }
        await ctx.render('login-register');
    };

    async fastRegister(ctx, next) {
        //validate input , email , company name 
        let result = Joi.validate(ctx.request.body, userValidationSchema.fastRegister);
        if (result.error) {
            ctx.throw(result.error);
        }

        const userModel = new User(ctx.state.db);
        if (await userModel.checkExistUserByEmail(ctx.request.body.email)) {
            ctx.throw('user exists');
        }

        const companyModel = new Company(ctx.state.db);
        const companyId = await companyModel.createCompany(ctx.request.body.companyName);
        let userId = await userModel.fastRegister(ctx.request.body.email, companyId);

        ctx.body = { data: { userId: userId }, error: null };


    }

    async registerUser(ctx, next) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.createUser);
        if (result.error !== null) {
            ctx.throw(result.error);
        }

        const userModel = new User(ctx.state.db);

        if (await userModel.checkExistUserByEmail(ctx.request.body.email)) {
            ctx.throw('user exists');//TODO central error message
        }

        let userId = await userModel.createUser(ctx.request.body);
        ctx.body = { data: { userId: userId }, error: null };
    }

    async isAuthenticated(ctx, next) {
        if (ctx.isAuthenticated()) return next();
        ctx.redirect('/login');
    }

    async logout(ctx) {
        ctx.logout();
        ctx.redirect('/login');
    }

    async login(ctx) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.createUser);
        if (result.error !== null) {
            ctx.throw(result.error);
        }
        return passport.authenticate('local', (err, user, info, status) => {
            if (user === false) {
                ctx.throw(401, new Error(info.message));//TODO 
            } else {
                ctx.login(user);
                ctx.redirect('/');
            }
        })(ctx)
    }

}

module.exports = AuthController;