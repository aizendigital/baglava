
'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');
const salarySchema = require('../salary/salarySchema');
const Schema = mongoose.Schema;
const employmentDetailSchema = Schema({
    type: String,
    experience: [String],
    education: [String],
    keyword: String
});


let jobSchema = Schema({
    title: String,
    slug: String,
    department: String,
    internalCode: String,
    location: locationSchema,
    description: String,
    requirements: String,
    benefits: [String],
    isInHouseEmployer: Boolean,
    isAgency: Boolean,
    salary : salarySchema,
    jobFunction: String,
    companyIndustry: String,
    employmentDetail : employmentDetailSchema,
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    createdAt: { type: Date, default: Date.now }
});

jobSchema.statics.listJobs = function(query){
    // return this.find({ slug: slug }).then(cb);
}


module.exports = mongoose.model('Job', jobSchema);

