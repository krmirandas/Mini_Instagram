'use strict'

var express = require('express');
var PublishController = require('../controllers/publish');

var api = express.Router();

var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/images'})

api.get('/p/:id', md_auth.ensureAuth, PublishController.getImage);
api.post('/p', md_auth.ensureAuth, PublishController.saveImage);
api.get('/p/:page?', md_auth.ensureAuth, PublishController.getImages);
api.put('/p/:id', md_auth.ensureAuth, PublishController.updateImage);
api.delete('/p/:id', md_auth.ensureAuth, PublishController.deleteImage);
api.post('/upload-p-image/:id', [md_auth.ensureAuth, md_upload], PublishController.uploadImage);
api.get('/get-p-image/:imageFile', PublishController.getImageFile);



module.exports = api;