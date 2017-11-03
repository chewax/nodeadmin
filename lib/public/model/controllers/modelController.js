'use strict';

angular.module('nodeAdmin.model')

    .controller('ModelController', [ '$scope', '$routeParams','$interval', '$window', '$uibModal','$dotize', 'modelServices', '_', function ($scope, $routeParams, $interval, $window, $uibModal, $dotize, modelServices, _) {
        
        
        $scope.modelName = $routeParams.modelName;
        $scope.rows = [];
        $scope.modelSchema = {};
        $scope.normalizedPaths = [];
        
        preloadOrRefresh();

        $scope.edit = function(row) {
            $scope.editingRecord = $dotize.convert(row);
            editRecordModal()
            .then(function(result){
                return modelServices.updateRecord($routeParams.modelName, result);
            })
            .then(function(result){
                preloadOrRefresh();
            })
            .catch(function(err){
                console.log(err);
            })
        }   

        $scope.delete = function (row) {
            confirmModal("Confirm delete row?")
            .then(function(result){
                return modelServices.deleteRecord($routeParams.modelName, row._id);
            })
            .then(function(result){
                preloadOrRefresh();
            })
            .catch(function(err){
                console.log(err);
            })

        }

        $scope.isObject = function(value) {
            return typeof value == 'object';
        }

        $scope.new = function () {
            newRecordModal()
            .then(function(result){
                return modelServices.createRecord($routeParams.modelName, result);
            })
            .then(function(result){
                preloadOrRefresh();
            })
            .catch(function(err){
                console.log(err);
            })
            
        }

        function preloadOrRefresh() {
            getModelSchema()
            .then(function(result){
                $scope.modelSchema = result.data;
                normalizePaths(result.data.paths);
                return modelServices.getModels($routeParams.modelName)
            })
            
            .then(function(result){
                $scope.rows = result.data;
            })
            .catch(function(err){
                console.log(err);
            })
        }

        function getModelSchema() {
            return modelServices.getSchema($routeParams.modelName)
        }

        function confirmModal(text) {
            $scope.modalText = text;
            var modalInstance = $uibModal.open({
                templateUrl: '/core/views/confirmModal.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                scope: $scope
            });

            return modalInstance.result;
        }


        function newRecordModal() {
            var modalInstance = $uibModal.open({
                templateUrl: '/model/views/newRecordModal.html',
                controller: 'NewRecordCtrl',
                controllerAs: '$ctrl',
                scope: $scope
            });

            return modalInstance.result;
        }


        function editRecordModal() {
            var modalInstance = $uibModal.open({
                templateUrl: '/model/views/newRecordModal.html',
                controller: 'EditRecordCtrl',
                controllerAs: '$ctrl',
                scope: $scope
            });

            return modalInstance.result;
        }

        /**
         * If path is of type "credentials.username", the nomrmalized path will result in "credentials";
         */
        function normalizePaths (paths) {
            for (var path in paths) {
                $scope.normalizedPaths.push(path.split('.')[0]);
            }
            $scope.normalizedPaths = _.uniq($scope.normalizedPaths);
        }

    }])
