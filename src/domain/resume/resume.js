'use strict';
const mongoose = require('mongoose');


let resumeSchema = mongoose.Schema({
    file: String,
    format: String
});


module.exports = mongoose.model('Resume', resumeSchema);