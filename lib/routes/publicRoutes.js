(function () {
    'use strict';

    var express = require('express');
    var modelRoutes = require('../modules/model/modelRoutes');

    var router = express.Router();
    router = modelRoutes.appendPublicRoutes(router);

    module.exports = router;

}).call(this);

