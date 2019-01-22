'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function pruebas(req,res){
    res.status(200).send({
        message: 'Probando una accion'
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    console.log(params);

    user.mobile = params.mobile;
    user.email = params.email;
    user.name = params.name;
    user.username = params.username;
    user.photo = 'null';
    user.privacity = false;
    user.description = 'null';

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.username != null && (user.mobile != null || user.email != null)){
                //guardar el usuario
                    user.save((error, userStored) =>{
                        if(err){
                            res.status(500).send({ message: 'Error al guardar el usuario'});
                        }else{
                            if(!userStored){
                                res.status(404).send({ message: 'No se ha registrado el usuario'});
                            }else{
                                res.status(200).send({user: userStored});
                            }
                        }

                    });
            }else{
                res.status(200).send({
                    message: 'Introduce los campos solicitados'
                });
            }
        });
    }else{
        res.status(500).send({
            message: 'Introduce la contraseña'
        });
    }
}


function loginUser(req, res){
    var params = req.body;
    var username = params.username;
    var password = params.password;

    User.findOne({username: username}, (err, user)=>{
            if(err){
            res.status(500).send({ message: 'Error en la peticion'}); 
            }else{
                if(!user){
                    res.status(404).send({ message: 'No existe el usuario'});
                }else{
                    bcrypt.compare(password, user.password, function(err, check){
                        if(check){
                            //regresa los datos del usuario
                            if(params.gethash){
                                //devolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            }else{
                                res.status(200).send({user});
                            }
                        }else{
                            res.status(404).send({ message: 'No e ha podido loggear'});
                        }
                    });
                }
            }
        });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) =>{
        if(err){
            res.status(500).send({message: 'Error al actualizar usuario'});
        }else{
            if(!userUpdate){
                 res.status(404).send({message: 'No se ha podido actualizar'});
            }else{
                res.status(200).send({user: userUpdate});
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = "No upload.."
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1]; 

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){
            User.findByIdAndUpdate(userId, {photo:file_name}, (err, userUpdate)=>{
                if(!userUpdate){
                    res.status(404).send({message: 'No se ha podido actualizar'});
                }else{
                    res.status(200).send({user: userUpdate});
                }
                
            });
        }else{
            res.status(200).send({message: 'Extensión no valida'});
        }

        
        console.log(ext_split);
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;

    fs.exists('./uploads/users/' + imageFile, function(exists){
        if(exists){
            res.sendFile(path.resolve('./uploads/users/' + imageFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}