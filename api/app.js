'use strict';
var express = require('express'); 
var bodyParser = require('body-parser');


var app = express();

//cargar rutasv
var user_routes = require('./routes/user');
var publish_routes = require('./routes/publish');
var like_routes = require('./routes/like');
var follower_routes = require('./routes/follower');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');

    next();

})

//carga de rutas
app.use('/api', user_routes);
app.use('/api', publish_routes);
app.use('/api', like_routes);
app.use('/api', follower_routes);
//exportarmos en modulo



module.exports = app;