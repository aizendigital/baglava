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


    async fastRegister(ctx, next) {
        let result = Joi.validate(ctx.request.body, userValidationSchema.fastRegister);
        if (result.error) {
            ctx.throw(result.error);
        }

        const userModel = new User(ctx.state.db);
        const user = await userModel.checkExistUserByEmail(ctx.request.body.email);

        if (user && user.active) {
            ctx.throw('user exists');
        }

        if (user && !user.active) {
            ctx.throw('user is not active');
        }

        const companyModel = new Company(ctx.state.db);

        if (await companyModel.checkCompanyExistOrOwnerIsActive(ctx.request.body.companyName)) {
            ctx.throw('company name exists');
        }

        const companyId = await companyModel.createCompany(ctx.request.body.companyName);

        let userId = await userModel.fastRegister(ctx.request.body.email, companyId);

        

        ctx.body = { data: { userId: userId }, error: null };


    }

    async isAuthenticated(ctx, next) {
        if (ctx.isAuthenticated()) return next();
        ctx.throw('not authorized');
    }

    async logout(ctx) {
        ctx.logout();
        ctx.body = { data: { message: 'successfully logged out' }, error: null };
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
                ctx.body = { data: { message: 'successfully logged in' }, error: null };
            }
        })(ctx)
    }

}

module.exports = AuthController;