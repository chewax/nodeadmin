(function(){
    'use strict;'

    var modelController = require('./modelController');

    module.exports.appendProtectedRoutes = function(router){

        return router;
    };

    module.exports.appendPublicRoutes = function(router){
        
        router.get('/models', modelController.all); //Get all models
        router.get('/models/:name/schema', modelController.schema); //Get model schema
        router.get('/models/:name', modelController.retrieve); //Get model records
        
        router.post('/models', modelController.create); //Create a model schema
        router.post('/models/:name', modelController.create); //Create a record in a  model
        
        router.put('/models/:name', modelController.update); //Update Model record
        router.put('/models/:name/schema', modelController.update); //Update Model schema

        router.delete('/models', modelController.delete); //Delete model schema
        router.delete('/models/:name/record/:id', modelController.delete); //Delete model record
        
        return router;
    };


}).call(this);
