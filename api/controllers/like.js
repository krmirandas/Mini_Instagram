'use stric'

var path = require('path');
var fs = require('fs'); //sistema de ficheros
var mongoosePaginate = require('mongoose-pagination');
var Like = require('../models/like'); 


function getLikes(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsperPage = 5;

    Like.find().sort('date').paginate(page, itemsperPage, function(err, like, total){
        if(err){
            res.status(500).send({message: "Error en la petición"});
        }else{
            if(!like){
                res.status(404).send({message: "No likes"});
            }else{
               return res.status(200).send({
                   number_likes: total,
                   like: like 
                });
            }
        }
    });
}

function saveLike(req, res){
    var like = new Like();
    var params = req.body;

    console.log(params);
    like.user = params.user;
    like.publish = params.publish;
   
    like.save((err, likeStored) => {
        if(err){
            res.status(500).send({message: "Error al gurdar el like"});
            console.log(err);
        }
        else{
            if(!likeStored){
                res.status(404).send({message: "El like no ha sido guardado"});
            }else{
                res.status(200).send({like: likeStored});
            }
        }
    });

}


function deleteLike(req, res){
    var likeId = req.params.id;
    
    Like.findByIdAndRemove(likeId, (err, likeRemoved) => {
        if(err){
            res.status(500).send({message: "Error al guardar el like"});
        }else{
            if(!likeRemoved){
                res.status(404).send({message: "No ha sido actualizado"});
            }else{
                res.status(200).send({likeRemoved});
            }
        }
    });
}




module.exports = {
    saveLike,
    getLikes,
    deleteLike,
    

};



