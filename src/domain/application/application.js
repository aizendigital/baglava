'use strict';

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

let resumeSchema = Schema({
    file: String,
    format: String
});

let applicationQuestionSchema = Schema({
    title: String,
    answer: String
});

let applicationSchema = Schema({
    resume: [resumeSchema],
    questions: [applicationQuestionSchema],
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Application' , applicationSchema);