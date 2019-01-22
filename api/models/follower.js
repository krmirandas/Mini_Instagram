'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    follower: {type: Schema.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Follower', FollowerSchema);