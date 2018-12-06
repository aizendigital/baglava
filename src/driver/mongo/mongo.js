
'use strict';

const config = require('../../config/config.js');
const mongoose = require('mongoose');
mongoose.connect(config.mongoUri);

module.exports = mongoose;
