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


module.exports.company = {
    title: Joi.string().required(),
    overview: Joi.string(),
    logo: Joi.string(),
    location: locationSchema,
    website: Joi.string(),
    foundedDate: Joi.date().max('now'),
    industry: Joi.string(),
    size: Joi.number().integer().positive().required(),
    photos: Joi.array().items(Joi.string()),
    revenue: revenueSchema,
    reviews: Joi.array().items(Joi.string()),
    salaries: Joi.array().items(salarySchema)
};



