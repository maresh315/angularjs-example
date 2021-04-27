'use strict';

angular.module('myApp.view2', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view2', {
//     // templateUrl: 'view2/view2.html',
//     controller: 'View2Ctrl'
//   });
// }])

.controller('View2Ctrl', ['$scope', '$state', 
  function($scope, $state) {

  var userReset = {
    username: '',
    password: '',
    role: ''
  };
  $scope.reset = function() {
    $scope.username = userReset.username;
    $scope.password = userReset.password;
    $scope.role = userReset.role;
  };
  $scope.reset();

  $scope.registerUser = function(){
    // constructor
    var user = {
      username: '',
      password: '',
      role: ''
    };
  
    // Form Items
    var username = $scope.username;
    var password = $scope.password;
    var role = $scope.role;
  
    // assignment
    user.username = username;
    user.password = password;
    user.role = role;
  
  
    if(validateRegistration(user.username, user.password)){
      // Add to local storage then go to login
      localStorage.setItem(user.username,JSON.stringify(user));
      $state.go('login');
    }else
      $scope.reset();
  
  }
  
  function validateRegistration(username, password){
    // Validate the Username
    var validUsername = new RegExp('^(?=.{2,10})')
    .test(username);
    
    // Validate the Password
    var validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .test(password);
    
    // Validation
    if(!validUsername ) {
      alert(username + ' needs to have '+
      'a minimum 2 characters and a maximum of 10')
      return false;
    }else if(!validPassword){
      alert(password + ' needs to have '+
      'a minimum 8 characters, '+
      'at least 1 uppercase letter, '+
      '1 lowercase letter, '+
      '1 number and 1 special character')
      return false;
    }else
      return true;
  
  }

}]);