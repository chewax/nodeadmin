(function () {
    'use strict';

    var messages = require('./../systemMessages');
    var logger = require('../../log/logger').getLogger();

    module.exports.handleUncaughtErrors = function(err, req, res, next) {

        console.log(err);

        if (err.name === 'UnauthorizedError') {

            var requestInfo = {
                ip: req.connection.remoteAddress
            }

            logger.warn('Access attempt with invalid token: ' + JSON.stringify(requestInfo) );
            res.status(401).send(messages.data.missingOrIncomplete("Token"));

        }


        if (err.name === 'SyntaxError') {

            var requestInfo = {
                ip: req.connection.remoteAddress
            };

            logger.info('Bad request, syntax error: ' + JSON.stringify(requestInfo) );
            res.status(401).send(messages.request.badRequest(err.message));

        }


        logger.error('Unhandled Error: ' + err );
        res.status(500).send(messages.generic());

    };


    module.exports.handleError = function(err, req, res) {
        if (typeof req == 'undefined') req = null;
        if (typeof res == 'undefined') res = null;

        logger.error(err.message, err);
        if (res != null) res.status(500).send(err.message);
    }

}).call(this);
