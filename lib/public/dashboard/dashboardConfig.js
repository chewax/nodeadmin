angular.module('nodeAdmin.dashboard')

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/views/dashboard.html',
            controller: 'DashboardController'
        });
    }])

