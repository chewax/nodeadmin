angular.module('nodeAdmin.model')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/model/:modelName', {
            templateUrl: 'model/views/model.html',
            controller: 'ModelController'
        });
    }])

