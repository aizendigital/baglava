'use strict';

const companyValidation = require('../../../domain/company/validation');
const Company = require('../../../domain/company/company');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../../utils/functions');

const Joi = require('joi');


class CompanyController {


    /**
     * Path: /api/v1/companies
     * Method: POST
     * Desc: create new company
     */

    async createCompany(ctx, next) {

        let result = Joi.validate(ctx.request.body, companyValidation.createCompany);
        if (result.error !== null) ctx.throw(400);

        const companyModel = new Company(ctx.state.db);
        const userModel = new userError(ctx.state.db);

        const [exist, existError] = await companyModel.checkExistCompanyByName(ctx.request.body.name);
        if (existError) ctx.throw(existError);

        if (exist) ctx.throw('company exist');

        const [companyId, createError] = await companyModel.createCompany(ctx.request.body.name);

        if (createError) ctx.throw(createError);

        const [update , updateError] = await userModel.updateCompanyId(ctx.state.user.id, companyId);
        if (updateError) ctx.throw(updateError);

        ctx.body = { data: { companyId: companyId }, error: null };

    };

}

module.exports = CompanyController;