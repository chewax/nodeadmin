(function () {

    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');
    var http = require('http');
    var cors = require('./config/cors');
    var config = require('./config/config');
    var publicRoutes = require('./routes/publicRoutes');
    var protectedRoutes = require('./routes/protectedRoutes');
    var errorHandler = require('./modules/core/errors/error_handler');
    var path = require('path');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use(config.api.version, publicRoutes);
    app.use(config.api.version, protectedRoutes);
    
    app.use(errorHandler.handleUncaughtErrors);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/public/admin.html')); // load the single view file (angular will handle the page changes on the front-end)
    });

    http.createServer(app).listen(config.server.port);

}).call(this);