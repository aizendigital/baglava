'use strict';




class AuthController {
    /**
         * Path: /login
         * Method: GET
         * Desc: get login page
         */

    async getLogin(ctx, next) {

        await ctx.render('login-register');
        // ctx.body = 'a';
        // ctx.body = { data: { id: company._id, slug: company.slug }, error: null };

    };


    async createUser(ctx, next){
        
    }

}

module.exports = AuthController;