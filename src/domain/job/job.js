
'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');

const salarySchema = mongoose.Schema({
    from: String,
    to: String,
    currency: String,
    createdAt: { type: Date, default: Date.now },
});

const employmentDetailSchema = mongoose.Schema({
    type: String,
    experience: [String],
    education: [String],
    keyword: String
});


let jobSchema = mongoose.Schema({
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
    salary: salarySchema,
    jobFunction: String,
    companyIndustry: String,
    employmentDetail: employmentDetailSchema,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    createdAt: { type: Date, default: Date.now }
});

jobSchema.statics.listJobs = function (q, limit, offset, order) {
    // return this.find({ slug: slug }).then(cb);
    return this.find({
        '$or': [{
            title: /q/
        }, {
            description: /q/
        }
        ]
    })
        .sort({ order: 1 })
        .limit(limit)
        .skip(offset);
}


module.exports = mongoose.model('Job', jobSchema);

