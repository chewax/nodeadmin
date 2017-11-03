
(function () {
    'use strict';

    var express = require('express');
    var expressJwt = require('express-jwt');
    var config = require('../config/config');
    var router = express.Router();

    //router.use(expressJwt({secret: config.jwt.secret}));

    module.exports = router;

}).call(this);