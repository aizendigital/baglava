
'use strict';

const mongoose = require('mongoose');

let salary  = mongoose.Schema({
    from: String,
    to: String,
    currency: String,
    createdAt: { type: Date, default: Date.now },
});


module.exports = salary;