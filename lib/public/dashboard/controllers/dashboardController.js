'use strict';

angular.module('nodeAdmin.dashboard')

    .controller('DashboardController', [ '$scope', '$interval', '$window', 'modelServices', function ($scope, $interval, $window, modelServices) {
        
        $scope.models = [];

        modelServices.getModels()
        .then(function(result){
            $scope.models = result.data.models;

        })
        .catch(function(err){
            console.log(err);
        })

    }])
