'use strict';
const mongoose = require('mongoose');


let attachmentSchema = mongoose.Schema({
    file: String,
    format: String
});


module.exports = mongoose.model('Attachment', attachmentSchema);