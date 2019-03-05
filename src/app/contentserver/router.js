
'use strict';

// const Router = require('koa-router');

// const router = new Router();
// const PageController = require('./controller/page');
// const JobController = require('./controller/job');
// const CompanyController = require('./controller/company');
const AuthController = require('./controller/auth');


// let pageController = new PageController();
// let jobController = new JobController();
// let companyController = new CompanyController();
// let auth = new AuthController();


// router.post('/fast_registration', auth.isNotAuthenticated, auth.fastRegistration);
// router.get('/send_activation_link', auth.sendActivationLink);
// router.post('/activation', auth.clickActiveLink);
// router.get('/resend_activation_link', auth.reSendActivationLink);

// router.post('/set_new_password', auth.setNewPassword);
// router.post('/reset_password_email', auth.sendResetPasswordEmail);

// router.post('/login', auth.login);
// router.get('/logout', auth.logout);



// router.get('/api/v1/page/:slug', pageController.getPage);
// router.get('/api/v1/jobs/', jobController.getJobs);
// router.post('/api/v1/jobs/', jobController.createJob);
// router.get('/api/v1/jobs/:companySlug/:jobSlug', jobController.getJobProfile);
// router.put('/api/v1/jobs/:companySlug/:jobSlug', jobController.updateJob);
// router.delete('/api/v1/jobs/:companySlug/:jobSlug', jobController.deleteJob);

// router.post('/api/v1/companies', companyController.createCompany);


// // TODO : auth.isAuthenticated to protect routes for now!, roll access later
// //
// // router.get('/public', function (ctx) {
// //     ctx.body = 'public route test';
// // });


// // router.get('/private', auth.isAuthenticated , function (ctx) {
// //     ctx.body = 'public route test';
// // });



const Router = require('koa-router');

class RouterWrapper {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
        this.router = new Router();
    }

    async routes(ctx, next) {
        const connection = await this.connectionPool.getConnection();
        let auth = new AuthController(connection);

        this.router.post('/fast_registration', auth.isNotAuthenticated, auth.fastRegistration.bind(auth));


        // this.router.post('/fast_registration', auth.isNotAuthenticated, auth.fastRegistration);
        // this.router.get('/send_activation_link', auth.sendActivationLink);
        // this.router.post('/activation', auth.clickActiveLink);
        // this.router.get('/resend_activation_link', auth.reSendActivationLink);

        // this.router.post('/login', auth.login);
        // this.router.get('/logout', auth.logout);


        return this.router.routes()(ctx, next);
    }

    async allowedMethods(ctx, next) {
        return this.router.allowedMethods()(ctx, next);
    }


}

module.exports = RouterWrapper;