'use strict';
const Joi = require('joi');

module.exports.fastRegister = Joi.object({
    email: Joi.string().email().required().error(new Error('Invalid Email Format')),//TODO refactor , translation
    password: Joi.string().min(8).required().error(new Error('Invalid Password, Min 8 character'))//TODO complex password
    // companyName: Joi.string().min(3).required().error(new Error('Invalid company name')),//TODO complex password
}).unknown(false);

module.exports.checkActivateToken = Joi.object({
    email: Joi.string().email().required().error(new Error('Invalid Email Format')),//TODO refactor , translation
    token: Joi.string().required().error(new Error('Invalid token'))
}).unknown(false);

module.exports.resetPassword = Joi.object({
    email: Joi.string().email().required().error(new Error('Invalid Email Format'))//TODO refactor , translation
}).unknown(false);

module.exports.setPassword = Joi.object({
    email: Joi.string().email().required().error(new Error('Invalid Email Format')),//TODO refactor , translation
    token: Joi.string().required().error(new Error('Invalid token')),
    password: Joi.string().min(8).required().error(new Error('Invalid Password, Min 8 character')),//TODO complex password
    repeatPassword: Joi.string().required().valid(Joi.ref('password')).error(new Error('Passwords  did\'nt match'))
}).unknown(false);

