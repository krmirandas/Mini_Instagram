'use strict'

var express = require('express');
var LikeController = require('../controllers/like');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

api.post('/like', md_auth.ensureAuth, LikeController.saveLike);
api.get('/like/:page?', md_auth.ensureAuth, LikeController.getLikes);
api.delete('/like/:id', md_auth.ensureAuth, LikeController.deleteLike);

module.exports = api;