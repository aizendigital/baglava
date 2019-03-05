'use strict';
const Joi = require('joi');
const locationSchema = require('../location/locationSchema');

const salarySchema = {
    from: Joi.number().integer().positive(),
    to: Joi.number().integer().min(Joi.ref('from')),
    currency: Joi.string()
};

const revenueSchema = {
    from: Joi.number().integer().positive(),
    to: Joi.number().integer().min(Joi.ref('from')),
    currency: Joi.string()
};

module.exports.createCompany = Joi.object({
    name: Joi.string().required()
}).required();