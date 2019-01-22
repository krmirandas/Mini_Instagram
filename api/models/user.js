'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    mobile : {type: Number, unique: true},
    email: {type: String, unique: true},
    name: String,
    username: {type: String, unique: true},
    password: String,
    photo: String,
    privacity: {type: Boolean, default: false},
    description: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);