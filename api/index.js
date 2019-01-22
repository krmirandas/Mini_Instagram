'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3000; 


mongoose.connect('mongodb://localhost:27017/Instagram', (err, res ) => {
    if (err){
        throw err;
    }else{
        console.log("La base de datos ha sido creada.");
        
        app.listen(port,function(){
            console.log("http://localhost:" + port);
        });
    }
});

