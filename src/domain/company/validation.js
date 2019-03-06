'use strict';
const Joi = require('joi');

module.exports.createCompany = Joi.object({
    name: Joi.string().required()
}).required();