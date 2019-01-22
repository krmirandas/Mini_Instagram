'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublishSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    image: String,
    description: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Publish', PublishSchema);