'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('./config/cors');
var publicRoutes = require('./routes/publicRoutes');
var protectedRoutes = require('./routes/protectedRoutes');
var errorHandler = require('./modules/core/errors/error_handler');
var path = require('path');
var db = require('./config/database');

module.exports = initAdmin;

function extend(obj, src) {
    var key,
        own = {}.hasOwnProperty;

    for (key in src) {
        if (own.call(src, key)) {
            obj[key] = src[key];
        }
    }
    return obj;
}

function initAdmin (mongoose) {
    
    db.init(mongoose);
    
    var app = express();
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
    
    app.use('/nodeadmin', publicRoutes);
    app.use('/nodeadmin', protectedRoutes);
    
    app.use(errorHandler.handleUncaughtErrors);
    
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/public/admin.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    http.createServer(app).listen(2100);
    console.log("[nodeadmin] - Node Admin started access at http://localhost:2100/nodeadmin");
}

