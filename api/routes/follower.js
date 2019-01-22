'use strict'

var express = require('express');
var FollowersController = require('../controllers/follower');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/followers', md_auth.ensureAuth, FollowersController.saveFollower);
api.get('/followers/:user?', md_auth.ensureAuth, FollowersController.getFollowers);
api.delete('/followers/:id', md_auth.ensureAuth, FollowersController.deleteFollower);

module.exports = api;