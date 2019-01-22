'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clavesecreta'

exports.createToken = function(user){
    var payload = {
        sub : user._id,
        name: user.name,
        username: user.username, 
        email: user.email,
        photo: user.photo,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()

    };

    return jwt.encode(payload, secret);
};