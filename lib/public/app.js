'use strict';

// Declare app level module which depends on views, and components
angular.module('nodeAdmin', [
  'ngRoute',
  'lodash',
  'dotize',
  'ui.bootstrap',
  'nodeAdmin.api',
  'nodeAdmin.core',
  'nodeAdmin.model',
  'nodeAdmin.dashboard'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])
.run(function ($rootScope) {

  $rootScope._config =
  {
      "baseURL": "http://localhost:2100",
      "apiVersion": "/nodeadmin"
  };

})

