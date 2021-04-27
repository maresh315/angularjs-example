'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  // 'myApp.version'
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
 function($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'view3/view3.html',
      controller: 'View3Ctrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    })
  
  // default route
  $urlRouterProvider.otherwise(function($injector){
    var $state = $injector.get("$state");
    $state.go('login')
  });
}]);
