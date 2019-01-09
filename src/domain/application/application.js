'use strict';

const mongoose = require('mongoose');
const resumeSchema = require('../resume/resume');
const attachmentSchema = require('../attachment/attachment');


let applicationQuestionSchema = mongoose.Schema({
    title: String,
    answer: String
});

let applicationSchema = mongoose.Schema({
    resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    attachment: [attachmentSchema],//TODO
    questions: [applicationQuestionSchema],
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Application' , applicationSchema);