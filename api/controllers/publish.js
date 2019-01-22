'use stric'

var path = require('path');
var fs = require('fs'); //sistema de ficheros
var mongoosePaginate = require('mongoose-pagination');
var Image = require('../models/publish'); 

function getImage(req, res){
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) =>{
        if(err){
            res.status(500).send({message: "Error en la petición"});
        }else{
            if(!image){
                res.status(404).send({message: "La imagen no existe"});
            }else{
                res.status(200).send({image});
            }
        }
    });
    
}

function getImages(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsperPage = 5;

    Image.find().sort('date').paginate(page, itemsperPage, function(err, images, total){
        if(err){
            res.status(500).send({message: "Error en la petición"});
        }else{
            if(!images){
                res.status(404).send({message: "No hay imagenes"});
            }else{
               return res.status(200).send({
                   number_img: total,
                   images: images 
                });
            }
        }
    });
}

function saveImage(req, res){
    var image = new Image();
    var params = req.body;

    console.log(params);
    image.user = params.user;
    image.image = 'null';
    image.description = params.description;
   
    image.save((err, imageStored) => {
        if(err){
            res.status(500).send({message: "Error al gurdar la imagen"});
            console.log(err);
        }
        else{
            if(!imageStored){
                res.status(404).send({message: "La imagen no ha sido gaurdada"});
            }else{
                res.status(200).send({image: imageStored});
            }
        }
    });

}

function updateImage(req, res){
    var imageId = req.params.id;
    var update = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdate) => {
        if(err){
            res.status(500).send({message: "Error al gurdar la imagen"});
        }else{
            if(!imageUpdate){
                res.status(404).send({message: "No ha sido actaulizado"});
            }else{
                res.status(200).send({image: imageUpdate});
            }
        }
    });
}

function deleteImage(req, res){
    var imageId = req.params.id;
    
    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if(err){
            res.status(500).send({message: "Error al gurdar la imagen"});
        }else{
            if(!imageRemoved){
                res.status(404).send({message: "No ha sido actaulizado"});
            }else{
                res.status(200).send({imageRemoved});
            }
        }
    });
}

function uploadImage(req, res){
    var imageId = req.params.id;
    var file_name = "No upload.."
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[2];

        var ext_split = file_name.split('.');
        var file_ext = ext_split[1]; 

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' ){
            Image.findByIdAndUpdate(imageId, {image:file_name}, (err, imageUpdate)=>{
                if(!imageUpdate){
                    res.status(404).send({message: 'No se ha podido actualizar'});
                }else{
                    res.status(200).send({image: imageUpdate});
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

    fs.exists('./uploads/images/' + imageFile, function(exists){
        if(exists){
            res.sendFile(path.resolve('./uploads/images/' + imageFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}
module.exports = {
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile

};



