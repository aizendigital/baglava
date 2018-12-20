
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
    location: { type: locationSchema, required: true },
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
    jon.slug = await getJobUniqueSlug(job.title);
    return this.create(job);
}

jobSchema.statics.updateJob = function (job) {
    job.slug = undefined;
    return this.findOneAndUpdate({ _id: mongoose.Types.ObjectId(job.id) }, job).exec();
}
jobSchema.statics.deleteJob = function (jobId) {
    return this.findOneAndDelete({ _id: mongoose.Types.ObjectId(jobId) }).exec();
}


jobSchema.statics.existsBySlug = function(slug){
    return this.find({slug : slug});
}



async function getJobUniqueSlug(title, rand) {
    let slug = slugify(title);
    if (rand) slug = slug + '-' + rand;
    if (!await this.findOne({ slug: slug })) {
        return slug;
    } else {
        return getJobUniqueSlug(title, Math.random().toString(36).substring(7));
    }
}

module.exports = mongoose.model('Job', jobSchema);

