
'use strict';

const mongoose = require('mongoose');

let location  = mongoose.Schema({
    country: String,
    city: String,
    additionalInfo: String,
    isRemote: Boolean,
    address: String,
    state : String,
    zipCode: String,
    createdAt: { type: Date, default: Date.now },
});


module.exports = location;