
'use strict';

const jobModel = require('../../../domain/job/job');
const jobListQuerySchema  = require('../../../validationSchemas/job');
const Joi = require('joi');

class JobController {

    async getJobs(ctx, next) {

        const result = Joi.validate( ctx.query, jobListQuerySchema);
        ctx.body = result;

        next();
    };

    constructor() {
        this.jobModel = jobModel;
        this.getJobs = this.getJobs.bind(this);

    }



}

module.exports = JobController;
