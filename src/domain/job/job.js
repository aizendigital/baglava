
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

const employmentDetailSchema = mongoose.Schema({
    type: String,
    experience: [String],
    education: [String],
    keyword: String
});


let jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    department: String,
    internalCode: String,
    location: { type: locationSchema },
    description: String,
    requirements: String,
    benefits: [String],
    isInHouseEmployer: Boolean,
    isAgency: Boolean,
    salary: salarySchema,
    jobFunction: String,
    companyIndustry: String,
    employmentDetail: employmentDetailSchema,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdAt: { type: Date, default: Date.now }
});

jobSchema.statics.listJobs = function (q, limit, offset, order) {
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



jobSchema.statics.createJob = async function (job) {
    return this.create(job);
}

jobSchema.statics.updateJob = function (condition, job) {
    return this.findOneAndUpdate(condition, job, { new: true }).exec();
}
jobSchema.statics.deleteJob = function (jobId) {
    return this.findOneAndDelete({ _id: mongoose.Types.ObjectId(jobId) }).exec();
}


jobSchema.statics.existsBySlugAndCompanyId = function (slug, companyId) {
    return this.findOne({ slug: slug, company: new mongoose.Types.ObjectId(companyId) });
}


module.exports = mongoose.model('Job', jobSchema);

// class Job{
//     static async listJobs(q, limit, offset, order) {
//         const [pages] = await global.db.query('SELECT * FROM job ORDER BY :order desc LIMIT :limit OFFSET :offset', { slug });
        
//     }
// }