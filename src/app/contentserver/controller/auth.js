'use strict';

const userModel = require('../../../domain/user/user');
const userValidationSchema = require('../../../domain/user/validation');
const LocalStrategy = require('passport-local').Strategy

const Joi = require('joi');


class AuthController {

    /**
     * Path: /login
     * Method: GET
     * Desc: get login page
     */

    async getLogin(ctx, next) {
        console.log(ctx.isAuthenticated());
        if(ctx.isAuthenticated()){
            ctx.redirect('/');
        }
        await ctx.render('login-register');
    };


    async registerUser(ctx, next) {

        let result = Joi.validate(ctx.request.body, userValidationSchema.createUser);
        if (result.error !== null) {
            ctx.throw(result.error);
        }


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

}

module.exports = AuthController;