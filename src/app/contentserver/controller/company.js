'use strict';

const companyQuerySchema = require('../../../domain/company/companyValidationSchema');
const companyModel = require('../../../domain/company/company');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../../utils/functions');

const Joi = require('joi');


class CompanyController {


    /**
     * Path: /api/v1/companies
     * Method: POST
     * Desc: create new company
     */

    async createCompany  (ctx, next) {

        let result = Joi.validate(ctx.request.body, companyQuerySchema.company);

        if (result.error !== null) {
            ctx.throw(400);
        }

        ctx.request.body.slug = await utilFunctions.generateModelSlug(ctx.request.body.title , companyModel);

        let company = await companyModel.
            createCompany(ctx.request.body)
            .catch(err => {
                ctx.throw(err);
             });

        ctx.body = { data: { id: company._id , slug: company.slug }, error: null };

    };

}

module.exports = CompanyController;