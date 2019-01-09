'use strict';

const Joi = require('joi');

module.exports.location  = Joi.object().keys({
    country: Joi.string(),
    city: Joi.string(),
    additionalInfo: Joi.string(),
    isRemote: Joi.boolean(),
    address: Joi.string(),
    state : Joi.string(),
    zipCode: Joi.string()
}).or('country', 'isRemote');

