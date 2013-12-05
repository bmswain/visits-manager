'use strict';


// Declare app level module which depends on filters, and services
angular.module('visitsApp', [
  'ngRoute',
  'visitsApp.filters',
  'visitsApp.services',
  'visitsApp.directives',
  'visitsApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/list', {
      templateUrl: 'partials/full-list.html',
      controller: 'fullListCtrl'
    }).
    when('/person/:id', {
      templateUrl: 'partials/person-details.html',
      controller: 'personDetailsCtrl'
    }).
    otherwise({
      redirectTo: '/list'
    });
}]);
