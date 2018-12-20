'use strict';

const joi = require('joi');

module.exports.location  = Joi.object().keys({
    country: joi.string(),
    city: joi.string(),
    additionalInfo: joi.string(),
    isRemote: joi.boolean(),
    address: joi.string(),
    state : joi.string(),
    zipCode: joi.string()
}).or('country', 'isRemote');

