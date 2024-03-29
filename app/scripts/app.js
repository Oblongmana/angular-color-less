'use strict';

angular.module('colorLessApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ColorcontrollerCtrl'
      })
      .when('/pantoneView', {
        templateUrl: 'views/pantoneView.html',
        controller: 'ColorcontrollerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
