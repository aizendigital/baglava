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


module.exports.company = Joi.object({
    title: Joi.string().required(),
    overview: Joi.string(),
    logo: Joi.string(),
    website: Joi.string(),
    foundedDate: Joi.date().max('now'),
    industry: Joi.string(),
    size: Joi.number().integer().positive(),
    photos: Joi.array().items(Joi.string()),
    reviews: Joi.array().items(Joi.string())
}).required();



