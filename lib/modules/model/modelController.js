(function () {
    'use strict';

    var db = require ("../../config/database");    
    var config = require("../../config/config");
    var _ = require("lodash");
    var errorHandler = require('../core/errors/error_handler');

    /**
     * Retreives ModelInfo
     * @param req
     * @param res
     */
    module.exports.schema = function(req, res){
        var schema = db.mng().models[req.params.name].schema;
        var paths = schema.paths;
        res.status(200).json(schema);
    };

    module.exports.schemaPaths = function(req, res){
        var schema = db.mng().models[req.params.name].schema;
        var paths = schema.paths;
        res.status(200).json(paths);
    };

    module.exports.retrieve = function(req, res) {

        var model = db.conn().model(req.params.name);
        var query = {}
        if (req.params.id) query = {_id:req.params.id};

        model.find(query)
            .lean(true)
            .select('-__v')
            .then(function(result){
                res.status(200).json(result);
            })
            .catch(function(err){
                errorHandler.handleError(err, req, res);
            });
    };

    module.exports.create = function(req, res) {

        var model = db.conn().model(req.params.name);

        delete req.body._id;

        for (var field in req.body) {
            if (typeof req.body[field] == "undefined" || req.body[field] == null || req.body[field] == '') delete req.body[field]
        }

        var newObj = new model(req.body);
        newObj.save()
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err){
                errorHandler.handleError(err, req, res);
            });
    };

    module.exports.update = function(req, res) {

        var model = db.conn().model(req.params.name);

        for (var field in req.body) {
            if (typeof req.body[field] == "undefined" || req.body[field] == null || req.body[field] == '') delete req.body[field]
        }

        model.findOneAndUpdate({_id: req.body._id}, req.body, {upsert:true})
            .then(function(result){
                res.status(200).json(result);
            })
            .catch(function(err){
                errorHandler.handleError(err, req, res);
            });
    }


    module.exports.delete = function(req, res) {

        var model = db.conn().model(req.params.name);

        model.findOneAndRemove({_id: req.params.id})
            .then(function(result){
                res.status(200).json(result);
            })
            .catch(function(err){
                errorHandler.handleError(err, req, res);
            });
    }

    module.exports.all =  function (req, res) {
        var _data = {};
        _data.models = [];

        for (var model in db.mng().models) {
            _data.models.push({
                name:model
            });
        }

        var promises = [];
        _data.models.forEach(function(m){

            var model = db.conn().model(m.name);

            promises.push(model.count()
                .then(function(result){
                    m.count = result;
                })
                .catch(function(err){
                    errorHandler.handleError(err, req, res);
                }));
        });
        
        Promise.all(promises)
        .then(function(){
            res.status(200).json(_data);
        })
        
    }


}).call(this);
