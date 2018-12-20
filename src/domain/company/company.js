
'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');

const salarySchema = mongoose.Schema({
    from: String,
    to: String,
    currency: String,
    createdAt: { type: Date, default: Date.now },
});

const revenueSchema  = mongoose.Schema({
    from: String,
    to: String,
    currency: String,
    createdAt: { type: Date, default: Date.now },
});

const interviewSchema = mongoose.Schema({
    title: String,
    application: String,
    interview: String,
    interviewQuestion: String,
    negotiation: String
});

let companySchema = mongoose.Schema({
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
    reviews : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    salaries : [salarySchema],
    interviews: [interviewSchema],
    createdAt: { type: Date, default: Date.now }
});


companySchema.statics.existsBySlug = function(slug){
    return this.find({slug : slug});
}


module.exports = mongoose.model('Company', companySchema);

