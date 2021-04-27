'use strict';

angular.module('myApp.view3', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view3', {
//     // templateUrl: 'view3/view3.html',
//     controller: 'View3Ctrl'
//   });
// }])

.controller('View3Ctrl', ['$scope', '$state', function($scope, $state) {
  $scope.loginUrl = '#!/view1';

  var CURRENT_USER = JSON.parse(sessionStorage.getItem(sessionStorage.key(0)));
  // Authentication using session storage
  if (!CURRENT_USER) { $state.go('login'); };
  
  $scope.users = getAllFromLocalStorage();
  $scope.selectedUser;
  $scope.userProfile = {
    username:CURRENT_USER.username,
    role:CURRENT_USER.role    
  };
  $scope.headers = Object.keys({
    username:'',
    role:''   
  });
  
  $scope.logout = function() {
    setTimeout(function(){
      sessionStorage.clear();
      $state.go('login');;
    },500)
  };
  
  
  function getAllFromLocalStorage(){
    var arr = [];
    for (var index = 0; index < localStorage.length; index++) {
      var element = JSON.parse(localStorage.getItem(localStorage.key(index))); 
      arr.push(element);
    }
    return arr;
  }
  
  $scope.onSave = function(user){
    // get from storage
    var retrieved = JSON.parse(
      localStorage.getItem(user.username)
    );
    
    var updated = {
      username: $scope.usernameUpdate,
      password: retrieved.password,
      role:retrieved.role
    }

    if(validateEdit(updated.username)){
      // remove from storage
      localStorage.removeItem(retrieved.username)
      
      // add updated
      localStorage.setItem(updated.username,JSON.stringify(updated))
      location.reload()
    }
    else{$scope.usernameUpdate = user.username}
    
  }

  function validateEdit(username){
    // Validate the Username
    var validUsername = RegExp('^(?=.{2,10})')
    .test(username)
    
    // Validation
    if(!validUsername ) {
      alert(username+' needs to have'+
      'a minimum 2 characters and a maximum of 10')
      return false;
    }else
      return true;

  }

  $scope.pageHeader = CURRENT_USER.role.charAt(0).toUpperCase()+CURRENT_USER.role.slice(1) + ' Profile'

  $scope.onEdit = function(storedUser){
    if(CURRENT_USER.role === 'manager'){
      if(storedUser.role === 'employee'){
        $scope.selectedUser = storedUser;
      }else if(storedUser.role === 'manager'){
        // $scope.selectedUser = storedUser;
        alert('You are a Manager')
        location.reload();
      }
      else{
        alert('You are not an Admin');
        $scope.selectedUser = null
      }
    }else if($scope.userProfile.role === 'admin'){
      $scope.selectedUser = storedUser
      console.log($scope.selectedUser)
    }else{
    $scope.selectedUser = storedUser
    console.log($scope.selectedUser)
    }
  }

  $scope.removeUser = function(storedUser){
    if($scope.userProfile.role === 'manager'){
      if(storedUser.role === 'employee'){
        localStorage.removeItem(storedUser.username);
        location.reload();
      }else
        alert('You are not an Admin');
    }else{
      localStorage.removeItem(storedUser.username);
      location.reload();
    }
  }

  // Who can see what buttons
  $scope.roleAccess = function(){
    var role = $scope.userProfile.role;
    
    if(role === 'admin'){
      // Can Do Everything
      return true
    }
    else if(role === 'manager'){
      // Can Edit only Employee
      return true
    }

    // Default to Employee
    return false
  }

}]);