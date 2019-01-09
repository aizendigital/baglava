'use strict';

const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
    rating : Number,
    text: String
});


module.exports = mongoose.model('Review', reviewSchema);


