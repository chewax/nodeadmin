(function () {
    'use strict';

    var messages = require('./../systemMessages');
    var debug = require('../debug');

    module.exports.handleUncaughtErrors = function(err, req, res, next) {

        if (err.name === 'UnauthorizedError') {

            var requestInfo = {
                ip: req.connection.remoteAddress
            }

            debug.warn('Access attempt with invalid token: ' + JSON.stringify(requestInfo) );
            res.status(401).send('Access attempt with invalid token');

        }

        if (err.name === 'SyntaxError') {

            var requestInfo = {
                ip: req.connection.remoteAddress
            };

            debug.info('Bad request, syntax error: ' + JSON.stringify(requestInfo) );
            res.status(401).send("bad request: "+err.message);

        }

        debug.error('Unhandled Error: ' + err);
        res.status(500).send('Unhandled Error: ' + err);

    };


    module.exports.handleError = function(err, req, res) {
        if (typeof req == 'undefined') req = null;
        if (typeof res == 'undefined') res = null;

        debug.error(err.message, err);
        if (res != null) res.status(500).send(err.message);
    }

}).call(this);
