'use strict';

angular.module('myApp.view1', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     // templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('View1Ctrl', ['$scope', '$state',
  function($scope, $state) {

  // Default Form + For Reset
  var userReset = {
    username: '',
    password: '',
  };
  $scope.reset = function() {
    $scope.username = userReset.username;
    $scope.password = userReset.password;
  };
  $scope.reset();


  // User Login
  $scope.loginUser = function(){
    // constructor
    var user = {
      username: '',
      password: '',
    };
  
    // Form Items
    var username = $scope.username;
    var password = $scope.password;
  
    // assignment
    user.username = username;
    user.password = password;
    // Get item from local storage
    var retrieved = JSON.parse(localStorage.getItem(user.username));

    if(validateLogin(user.username, user.password, retrieved)){
      // Start Session
      sessionStorage.setItem(retrieved.password,JSON.stringify(retrieved));
      $state.go('home');
    }
    else { $scope.reset(); }

  }

  
  // Validate User Login
  function validateLogin(username, password, storedUser){
    // Validate the Username
    var validUsername = RegExp('^(?=.{2,10})')
    .test(username);
    
    // Validate the Password
    var validPassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .test(password);
    
    // Validation
    if(!validUsername ) {
      alert(`${username} needs to have 
      a minimum 2 characters and a maximum of 10`);
      return false;
    }else if(!validPassword){
      alert(`${password} needs to have 
      a minimum 8 characters, 
      at least 1 uppercase letter, 
      1 lowercase letter, 
      1 number and 1 special character`);
      return false;
    }else if(storedUser.password !== password){
      alert('Your password was inorrect');
      return false;
    }else
      return true;
  
  }

  

}]);