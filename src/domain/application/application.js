'use strict';

const mongoose = require('mongoose');
const resumeSchema = require('../resume/resume');

let applicationQuestionSchema = mongoose.Schema({
    title: String,
    answer: String
});

let applicationSchema = mongoose.Schema({
    resume: [resumeSchema],
    questions: [applicationQuestionSchema],
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Application' , applicationSchema);