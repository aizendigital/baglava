
'use strict';

const config = require('../../config/config.js');
const mongoose = require('mongoose');


module.exports = function(){
    mongoose.connect(config.mongoUri);
};
