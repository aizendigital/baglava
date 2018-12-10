
'use strict';

const mongoose = require('mongoose');

let pageSchema = mongoose.Schema({
    title: String,
    slug: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
});


pageSchema.statics.findBySlug = function(slug, cb) {
    return this.findOne({ slug: slug }, cb);
}

module.exports = mongoose.model('Page', pageSchema);
