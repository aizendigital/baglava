
'use strict';

const Router = require('koa-router');
const AuthController = require('./controller/auth');
const JobController = require('./controller/job');


class RouterWrapper {
    constructor(connectionPool) {
        this.connectionPool = connectionPool;
        this.router = new Router();
    }

    async routes(ctx, next) {
        const connection = await this.connectionPool.getConnection();
        let auth = new AuthController(connection);
        let job = new JobController(connection);


        this.router.post('/fast_registration', auth.isNotAuthenticated, auth.fastRegistration.bind(auth));


        this.router.get('/send_activation_link', auth.sendActivationLink.bind(auth));
        this.router.post('/activation', auth.clickActiveLink.bind(auth));
        this.router.get('/resend_activation_link', auth.reSendActivationLink.bind(auth));

        this.router.post('/login', auth.login);
        this.router.get('/logout', auth.logout);


        this.router.post('/job', auth.isAuthenticated, job.createJob);


        return this.router.routes()(ctx, next);
    }

    async allowedMethods(ctx, next) {
        return this.router.allowedMethods()(ctx, next);
    }


}

module.exports = RouterWrapper;