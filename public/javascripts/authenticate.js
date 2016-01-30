//handles client-side authentication


var app = angular.module('authentication', [])
app.controller('authController', function($scope, $http) {
    //read http headers: 
    var req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    console.log(req.getAllResponseHeaders());

    //true if logged in
    $scope.authenticated = req.getResponseHeader("authenticated")=="true"
    //username (if registered and logged in)
    $scope.username = req.getResponseHeader("username")

    //user attempts to register a new account
    $scope.register=function(){
      $scope.response=""
      if ($scope.auth_password!=$scope.auth_password_confirm){
        $scope.response="passwords must match!"
        return;
      }
      $http.post("/auth/accounts", {
        username: $scope.auth_username,
        password: $scope.auth_password,
        account_type: $scope.auth_usertype
      }).then(function(response){
         if (response.data.success) //redirect to dashboard
           window.location='/';
         else if (response.data.msg)
           $scope.response=response.data.msg
      })
    }
    //user attempts log-in
    $scope.login=function(){
      $scope.response=""
      $http.post("/auth/login", {
        username: $scope.auth_username,
        password: $scope.auth_password
      }).then(function(response){
         if (response.data.success) //redirect to dashboard
           window.location='/';
         else if (response.data.msg)
           $scope.response=response.data.msg
       })
    }
    //log user out by deleting credential cookie
    $scope.logout=function(){
      $http.get("/auth/logout");
      window.location='/';
    }
  });
