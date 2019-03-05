const Joi = require('joi')
const location = require('../location/locationValidationSchema');

const salary = {
    from: Joi.string(),
    to: Joi.string(),
    currency: Joi.number().integer()
};

const employmentDetail =  {
    type: Joi.string(),
    experience: Joi.array().items(Joi.string()),
    education: Joi.array().items(Joi.string()),
    keyword: Joi.string()
};

module.exports.jobList = {
    q: Joi.string().description('the search text query'),
    limit: Joi.number().integer().positive().required(),
    offset: Joi.number().integer().positive().required(),
    order: Joi.string(),
    location: Joi.string()
}

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
    from: Joi.string().required(),
    to: Joi.string().required(),
    salary: Joi.string().required()
};


module.exports.modifiedJob = {
    title: Joi.string().required(),
    department: Joi.string(),
    internalCode: Joi.string(),
    location: location,
    description: Joi.string(),
    requirements: Joi.string(),
    benefits: Joi.array().items(Joi.string()),
    isInHouseEmployer: Joi.boolean(),
    isAgency: Joi.boolean(),
    salary: salary,
    jobFunction: Joi.string(),
    companyIndustry: Joi.string(),
    employmentDetail: employmentDetail,
};

