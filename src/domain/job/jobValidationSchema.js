const Joi = require('joi')

const jobList = {
    q: Joi.string().description('the search text query'),
    limit: Joi.number().integer().positive().required(),
    offset: Joi.number().integer().positive().required(),
    order: Joi.string(),
    location: Joi.string()
}


module.exports = jobList;