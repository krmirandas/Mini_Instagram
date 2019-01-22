'use stric'

var path = require('path');
var fs = require('fs'); //sistema de ficheros
var mongoosePaginate = require('mongoose-pagination'); //Divide las consultas
var Follower = require('../models/follower'); 

//Funcion: Regresa los seguidores de un usario
function getFollowers(req, res){
    //Recibira como respuesta el id del usuario
    var followerId = req.params.user;
    if(!followerId){
        var find = Follower.find({}).sort('date');
    }else{
        var find = Follower.find({follower: followerId}).sort('date');
    }
    //Por medio de populate se indica de que archivo se extrera los datos. Se recibe el usuario
    //Luego arreglo bien esto :v 
    find.populate({path: 'user'}).exec((err, followers) => {
        if(err){
            res.status(500).send({message: "Error al guardar el seguidor"});
        }else{
            if(!followers){
                 res.status(404).send({message: "No hay seguidor"});
            }else{  
                //Se guardan los usuarios en un objeto y se muestran
                res.status(200).send({followers});
            }
        }
        
    });
}

function saveFollower(req, res){
    var follow = new Follower();
    var params = req.body;

    console.log(params);
    follow.user = params.user;
    follow.publish = params.publish;
   
    follow.save((err, followerStored) => {
        if(err){
            res.status(500).send({message: "Error al guardar el seguidor"});
            console.log(err);
        }
        else{
            if(!followerStored){
                res.status(404).send({message: "El seguidor no ha sido guardado"});
            }else{
                res.status(200).send({follower: followerStored});
            }
        }
    });

}


function deleteFollower(req, res){
    var followerId = req.params.id;
    
    Follower.findByIdAndRemove(followerId, (err, followerRemoved) => {
        if(err){
            res.status(500).send({message: "Error al guardar el seguidr"});
        }else{
            if(!followerRemoved){
                res.status(404).send({message: "No ha sido actualizado"});
            }else{
                res.status(200).send({followerRemoved});
            }
        }
    });
}




module.exports = {
    saveFollower,
    getFollowers,
    deleteFollower,
    

};



