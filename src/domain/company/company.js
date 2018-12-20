
'use strict';

const mongoose = require('mongoose');
const slugify = require('slugify');

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

companySchema.statics.createCompany = async function(company){
    company.slug = await geCompanyUniqueSlug(company.title);
    return this.create(company);
}

//TODO will be removed
let companyModel = mongoose.model('Company', companySchema);

async function geCompanyUniqueSlug(title, rand) {
    let slug = slugify(title);
    if (rand) slug = slug + '-' + rand;
    // if (!await this.findOne({ slug: slug })) { // this does not relate statics
    if (!await companyModel.findOne({ slug: slug })) {
        return slug;
    } else {
        return geCompanyUniqueSlug(title, Math.random().toString(36).substring(7));
    }
}

module.exports = mongoose.model('Company', companySchema);

