'use strict';

require('../../../domain/company/company');

const Joi = require('joi');
const companyQuerySchema = require('../../../domain/company/companyValidationSchema');
const constants = require('../../../utils/constants');

function CompanyController(mongoose) {

    let companyModel = mongoose.model('Company');

    /**
     * Path: /api/v1/companies
     * Method: POST
     * Desc: create new company
     */

    this.createCompany = async function (ctx, next) {

        let result = Joi.validate(ctx.request.body, companyQuerySchema.company);
        // ctx.body = ctx.request.body;
        // return;
        if (result.error !== null) {
            ctx.throw(400);
        }
        
        let company = await companyModel.
            createCompany(ctx.request.body)
            .catch(err => ctx.throw(err));

        ctx.body = { data: { id: company._id }, error: null };

    };


}

module.exports = CompanyController;