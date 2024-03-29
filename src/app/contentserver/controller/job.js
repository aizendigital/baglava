'use strict';

const jobQuerySchema = require('../../../domain/job/jobValidationSchema');
const companyModel = require('../../../domain/company/company');
const jobModel = require('../../../domain/job/job');
const constants = require('../../../utils/constants');
const slugify = require('slugify');
const Joi = require('joi');



class JobController {


    /**
     * Path: /api/v1/jobs
     * Method: Get
     * Desc: get jobs list
     */

    async getJobs(ctx) {

        let result = Joi.validate(ctx.query, jobQuerySchema.jobList);
        if (result.error !== null) {
            ctx.throw(400);
        }

        let jobs = await jobModel.
            listJobs(ctx.query.q, ctx.query.limit, ctx.query.offset, ctx.query.order)
            .catch(err => {
                ctx.throw(err);
            });
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

    async createJob(ctx, next) {

        let result = Joi.validate(ctx.request.body, jobQuerySchema.job);
        if (result.error !== null) {
            ctx.throw(400);
        }

        ctx.request.body.slug = await generateModelSlug(ctx.request.body.title, jobModel);

        let job = await jobModel.
            createJob(ctx.request.body)
            .catch(err => {
                ctx.throw(err);
            });

        ctx.body = { data: { id: job._id, slug: job.slug }, error: null };

    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: Get
     * Desc: get job profile
     */

    async getJobProfile(ctx, next) {

        let company = await companyModel.existsBySlug(ctx.params.companySlug);
        if (!company) {
            ctx.throw(404);
        }
        console.log(ctx.params.jobSlug, company);
        let job = await jobModel.existsBySlugAndCompanyId(ctx.params.jobSlug, company._id);
        if (!job) {
            ctx.throw(404);
        }

        ctx.body = { data: job, error: null };

    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: PUT
     * Desc: update existing Job
     */

    async updateJob(ctx, next) {

        let result = Joi.validate(ctx.request.body, jobQuerySchema.modifiedJob);
        if (result.error !== null) {
            ctx.throw(400);
        }
        let company = await companyModel.existsBySlug(ctx.params.companySlug);
        if (!company) {
            ctx.throw(404);
        }
        let job = await jobModel.existsBySlugAndCompanyId(ctx.params.jobSlug, company._id);
        if (!job) {
            ctx.throw(404);
        }

        if (ctx.request.body.title) {
            ctx.request.body.slug = await utilFunctions.generateModelSlug(ctx.request.body.title, jobModel);
        }


        job = await jobModel.
            updateJob({ id: job._id }, ctx.request.body)
            .catch(err => {
                ctx.throw(err);
            });

        ctx.body = { data: { id: job._id, slug: job.slug, message: constants.updateSuccessMsg }, error: null };

    };

    /**
     * Path: /api/v1/jobs/:companySlug/:jobSlug
     * Method: delete
     * Desc: delete existing Job
     */

    async deleteJob(ctx, next) {

        let company = await companyModel.existsBySlug(ctx.params.companySlug);
        if (!company) {
            ctx.throw(404);
        }
        let job = await jobModel.existsBySlugAndCompanyId(ctx.params.jobSlug, company._id);
        if (!job) {
            ctx.throw(404);
        }

        await jobModel.deleteJob(job._id);

        ctx.body = { data: { id: job._id, message: constants.deleteSuccessMsg }, error: null };

    };


}


module.exports = JobController;