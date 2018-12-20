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

module.exports.job = {
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
    company: Joi.string().required(),
};


module.exports.jobList = jobList;