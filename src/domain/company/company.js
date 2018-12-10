
'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');
const salarySchema = require('../salary/salarySchema');
const revenueSchema = require('../revenue/revenueSchema');
const Schema = mongoose.Schema;
const interviewSchema = Schema({
    title: String,
    application: String,
    interview: String,
    interviewQuestion: String,
    negotiation: String
});

let companySchema = Schema({
    title: String,
    slug: String,
    overview: String,
    logo: String,
    location: locationSchema,
    website: String,
    foundedDate: Date,
    industry: String,
    size: String,
    photos: [String],
    revenue : revenueSchema,
    reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    salaries : [salarySchema],
    interviews: [interviewSchema],
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Company', companySchema);

