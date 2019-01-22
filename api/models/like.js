'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    publish: {type: Schema.ObjectId, ref: 'Publish'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Like', LikeSchema);