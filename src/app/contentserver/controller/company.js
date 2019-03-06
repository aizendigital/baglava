'use strict';

const companyValidation = require('../../../domain/company/validation');
const Company = require('../../../domain/company/company');
const User_Company = require('../../../domain/user_company/user_company');


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
        const user_companyModel = new User_Company(ctx.state.db);

        const [exist, existError] = await companyModel.checkExistCompanyByName(ctx.request.body.name);
        if (existError) ctx.throw(existError);

        if (exist) ctx.throw('company exist');

        const [companyId, createError] = await companyModel.createCompany(ctx.request.body.name);

        if (createError) ctx.throw(createError);

        const [update , updateError] = await user_companyModel.insertNewRelation(ctx.state.user.id, companyId, 'creator');
        if (updateError) ctx.throw(updateError);

        ctx.body = { data: { companyId: companyId }, error: null };

    };

}

module.exports = CompanyController;