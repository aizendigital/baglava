'use strict';

const mongoose = require('mongoose');
const locationSchema = require('../location/locationSchema');

let contact = mongoose.Schema({
    email: String,
    phone: String,
    location: locationSchema,
}); 

let experience = mongoose.Schema({
    title: String,
    description: String,
    location: locationSchema,
    startDate: Date,
    endDate: Date
});

let education = mongoose.Schema({
    school: String,
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
    contact: contact,
    about: String,
    skills: [String],
    experiences: [experience],
    education: [education]
})

module.exports = mongoose.model('Candidate', candidateSchema);

