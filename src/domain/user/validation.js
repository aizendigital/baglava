'use strict';
const Joi = require('joi');


module.exports.createUser = Joi.object({
    email: Joi.string().email().required().error(new Error('Invalid Email Format')),//TODO refactor , translation
    password: Joi.string().min(8).required().error(new Error('Invalid Password, Min 8 character')),//TODO complex password
});



