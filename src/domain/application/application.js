'use strict';

const mongoose = require('mongoose');

let resumeSchema = mongoose.Schema({
    file: String,
    format: String
});

let applicationQuestionSchema = mongoose.Schema({
    title: String,
    answer: String
});

let applicationSchema = mongoose.Schema({
    resume: [resumeSchema],
    questions: [applicationQuestionSchema],
    candidate: { type: Schema.types.ObjectId, ref: 'Candidate' },
    company: { type: Schema.types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Application' , applicationSchema);