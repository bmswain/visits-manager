'use strict';

/* Controllers */

angular.module('visitsApp.controllers', [])
  .controller('fullListCtrl', ['$scope', '$http', '$location', '$window',
    function($scope, $http, $location, $window) {
      $scope.head = {
        "name": "Name",
        "address": "Address",
        "phoneNumber": "Phone",
        "active": "Active",
        "visits": "Visits"
      };

      $http.get('data/persons-test.json').success(function(data) {
        $scope.persons = data;
      });

      $scope.notAlphabetical = function(obj){
        if (!obj) {
            return [];
        }
        return Object.keys(obj);
      }

      $scope.sort = {
        "column": 'name',
        "descending": false
      };

      $scope.selectedColumns = function(column) {
        return column == $scope.sort.column && 'sort-' + $scope.sort.descending;
      };

      $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
      };

      $scope.personDetailsClick = function(id) {
        $window.location.href = '#/person/'+id;
      }
    }])

  .controller('personDetailsCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
      $scope.getPerson = function(obj, key, val) {
        var object = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                object = object.concat($scope.getPerson(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                object.push(obj);
            }
        }
        return object;
      };

      $http.get('data/persons-test.json').success(function(data) {
        $scope.person = $scope.getPerson(data, 'id', $routeParams.id)[0];
        //init datepicker after data is loaded
        $('.datepicker').datepicker();
      });

    }]);


