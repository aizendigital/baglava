'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');
const resumeSchema = require('../resume/resume');

let schoolSchema = mongoose.Schema({
    location : locationSchema,
    title: String
})


let contactSchema = mongoose.Schema({
    email: String,
    phone: String,
    location: locationSchema,
}); 

let experienceSchema = mongoose.Schema({
    title: String,
    description: String,
    location: locationSchema,
    company : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    startDate: Date,
    endDate: Date
});

let educationSchema = mongoose.Schema({
    school: schoolSchema,
    degree: String,
    filedOfStudy: String,
    description: String,
    startDate: Date,
    endDate: Date
});

let candidateSchema = mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    website: String,
    resume: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }],
    contact: contactSchema,
    about: String,
    skills: [String],
    experiences: [experienceSchema],
    education: [educationSchema]
})

module.exports = mongoose.model('Candidate', candidateSchema);

