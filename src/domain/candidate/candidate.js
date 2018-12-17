'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');

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
    location: locationSchema,
    startDate: Date,
    endDate: Date
});

let candidateSchema = mongoose.Schema({
    title: String,
    firstName: String,
    lastName: String,
    website: String,
    contact: contactSchema,
    about: String,
    skills: [String],
    experiences: [experienceSchema],
    education: [educationSchema]
})

module.exports = mongoose.model('Candidate', candidateSchema);

