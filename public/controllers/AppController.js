var myApp = angular.module('myApp', [])

myApp.controller('AppController', [ '$scope', '$http', '$location', function( $scope, $http, $location){
  $http.get('/clients').success(function (response) {
    console.log('Data received from server');
    $scope.clients = response
  })
}])
