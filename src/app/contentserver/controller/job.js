'use strict';

require('../../../domain/job/job');

const Joi = require('joi');
const jobListQuerySchema  = require('../../../validationSchemas/job');


function JobController(mongoose) {

    let jobModel = mongoose.model('Job');

    /**
     * Path: /api/v1/jobs
     * Method: Get
     * Desc: get jobs list
     */

    this.getJobs = async function (ctx, next) {

        const result = Joi.validate( ctx.query, jobListQuerySchema);
        if( result.error !== null ){
            ctx.throw(400);
        }

        
    };
    
}

module.exports = JobController;