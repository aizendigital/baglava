
'use strict';

const mongoose = require('mongoose');

const locationSchema = require('../location/locationSchema');

const salarySchema = mongoose.Schema({
    from: String,
    to: String,
    currency: String
});

const revenueSchema = mongoose.Schema({
    from: String,
    to: String,
    currency: String
});

const interviewSchema = mongoose.Schema({
    //change interview Schema for ATS
    title: String,
    application: String,
    interview: String,
    interviewQuestion: [String],
    negotiation: String
});

let companySchema = mongoose.Schema({
    title: { type: String, unique: true },
    slug: String,
    website: String,
    phoneNumber: String,
    logo: String,
    profile: String,
    location: locationSchema,
    foundedDate: Date,
    industry: String,
    size: String,
    photos: [String],
    revenue: revenueSchema,
    salaries: [salarySchema],
    createdAt: { type: Date, default: Date.now }
});


companySchema.statics.existsBySlug = function (slug) {
    return this.findOne({ slug: slug });
}

companySchema.statics.createCompany = async function (company) {
    return this.create(company);
}

class Company {
    constructor(connection) {
        this.connection = connection;
    }

    async  createCompany(companyName) {

        let [rows, fields] = await this.connection.query('INSERT INTO company(name, created_at, updated_at) VALUES(?,?,?)',
            [companyName, new Date(), new Date()]);

        return rows.insertId;
    }
}


module.exports = Company;

