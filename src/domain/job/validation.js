const Joi = require('joi');

//
module.exports.createJob = {
    title: Joi.string().required(),
    department: Joi.string(),
    country: Joi.string(),
    region : Joi.string(),
    isRemote: Joi.boolean(),
    description: Joi.string().min(700).required(),
    requirements: Joi.string(),
    benefits: Joi.array().items(Joi.string()),
    companyIndustry: Joi.string(),
    jobFunction: Joi.string(),
    isAgency: Joi.boolean(),
    employmentType: Joi.string(),
    experience: Joi.string(),
    education: Joi.boolean(),
    keywords: Joi.array().items(Joi.string()),
    from: Joi.string(),
    to: Joi.string(),
    currency: Joi.string(),
    companyId: Joi.string().required()
};
