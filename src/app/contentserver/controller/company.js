'use strict';

const companyQuerySchema = require('../../../domain/company/companyValidationSchema');
const companyModel = require('../../../domain/company/company');
const constants = require('../../../utils/constants');
const slugify = require('slugify');
const Joi = require('joi');


function CompanyController(mongoose) {


    /**
     * Path: /api/v1/companies
     * Method: POST
     * Desc: create new company
     */

    this.createCompany = async function (ctx, next) {

        let result = Joi.validate(ctx.request.body, companyQuerySchema.company);

        if (result.error !== null) {
            ctx.throw(400);
        }

        ctx.request.body.slug = await generateCompanySlug(ctx.request.body.title);

        let company = await companyModel.
            createCompany(ctx.request.body)
            .catch(err => {
                ctx.throw(err);
             });

        ctx.body = { data: { id: company._id , slug: company.slug }, error: null };

    };


    async function generateCompanySlug(title, rand) {
        let slug = slugify(title);
        if (rand) slug = slug + '-' + rand;
        if (!await companyModel.findOne({ slug: slug })) {
            return slug;
        } else {
            return generateCompanySlug(title, Math.random().toString(36).substring(7));
        }
    }



}

module.exports = CompanyController;