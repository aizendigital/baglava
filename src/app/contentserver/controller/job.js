'use strict';

require('../../../domain/job/job');

const Joi = require('joi');
const jobQuerySchema = require('../../../domain/job/jobValidationSchema');
const companyModel = require('../../../domain/company/company');
const constants = require('../../../utils/constants');

function JobController(mongoose) {

    let jobModel = mongoose.model('Job');


    /**
     * Path: /api/v1/jobs
     * Method: Get
     * Desc: get jobs list
     */

    this.getJobs = async function (ctx, next) {

        let result = Joi.validate(ctx.query, jobQuerySchema.jobList);
        if (result.error !== null) {
            ctx.throw(400);
        }

        let jobs = await jobModel.
            listJobs(ctx.query.q, ctx.query.limit, ctx.query.offset, ctx.query.order)
            .catch(err => ctx.throw(err));
        if (!jobs) {
            ctx.throw(404);
        }
        ctx.body = { data: jobs, error: null };

    };

    /**
     * Path: /api/v1/jobs
     * Method: POST
     * Desc: create new Job
     */

    this.createJob = async function (ctx, next) {

        let result = Joi.validate(ctx.request.body, jobQuerySchema.job);
        if (result.error !== null) {
            ctx.throw(400);
        }

        let job = await jobModel.
            createJob(ctx.request.body)
            .catch(err => ctx.throw(err));

        ctx.body = { data: { id: job._id }, error: null };

    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: Get
     * Desc: get job profile
     */

    this.getJobProfile = async function (ctx, next) {

        if(!await companyModel.existsBySlug(ctx.params.companySlug)){
            ctx.throw(404);
        }
        let job = await jobModel.existsBySlug(ctx.params.jobSlug); 
        if(!job){
            ctx.throw(404);
        }

        ctx.body = { data: job, error: null };
        
    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: PUT
     * Desc: update existing Job
     */

    this.updateJob = async function (ctx, next) {

        let result = Joi.validate(ctx.request.body, jobQuerySchema.job);
        if (result.error !== null) {
            ctx.throw(400);
        }
        if(!await companyModel.existsBySlug(ctx.params.companySlug)){
            ctx.throw(404);
        }
        let job = await jobModel.existsBySlug(ctx.params.jobSlug); 
        if(!job){
            ctx.throw(404);
        }

        let job = await jobModel.
            updateJob(ctx.request.body)
            .catch(err => ctx.throw(err));

        ctx.body = { data: { id: job._id , message: constants.updateSuccessMsg}, error: null };

    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: delete
     * Desc: delete existing Job
     */

    this.deleteJob = async function (ctx, next) {

        if(!await companyModel.existsBySlug(ctx.params.companySlug)){
            ctx.throw(404);
        }
        let job = await jobModel.existsBySlug(ctx.params.jobSlug); 
        if(!job){
            ctx.throw(404);
        }

        await jobModel.deleteJob(job._id);

        ctx.body = { data: { id: job._id , message: constants.deleteSuccessMsg}, error: null };

    };

}

module.exports = JobController;