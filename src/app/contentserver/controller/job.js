'use strict';

require('../../../domain/job/job');

const Joi = require('joi');
const jobListQuerySchema = require('../../../validationSchemas/job');


function JobController(mongoose) {

    let jobModel = mongoose.model('Job');

    /**
     * Path: /api/v1/jobs
     * Method: Get
     * Desc: get jobs list
     */

    this.getJobs = async function (ctx, next) {

        let result = Joi.validate(ctx.query, jobListQuerySchema);
        if (result.error !== null) {
            ctx.throw(400);
        }

        let jobs = await jobModel.
            listJobs(ctx.query.q, ctx.query.limit, ctx.query.offset, ctx.query.order)
            .catch(err => ctx.throw(err));
        if(!jobs){
            ctx.throw(404);
        }
        ctx.body = { data: jobs, error: null };

    };

}

module.exports = JobController;