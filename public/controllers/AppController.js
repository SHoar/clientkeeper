var myApp = angular.module('myApp', [])

myApp.controller('AppController', [ '$scope', '$http', '$location', function( $scope, $http, $location){

  $http.get('/clients').success(function (response) {
    console.log('Data received from server');
    $scope.clients = response
  })

  $scope.addClient = function () {
    console.log('Adding new client ...');
    $http.post('/clients', $scope.client).success( function (response) {
      console.log('Client Added');
      window.location.href='/';
    })
  }

  $scope.editClient= function (id) {
    $('#addBtn').remove()
    $http.get('/clients/'+id).success(function (response) {
      $scope.client = response
    })
  }

  $scope.updateClient = function (id) {
    $http.put('/clients/'+$scope.client._id, $scope.client).success(function (response) {
      console.log('client update...');
      window.location.href='/'
      })
  }

  $scope.deleteClient = function (id) {
    $http.delete('/clients/'+id).success(function (response) {
      console.log('client removed');
      window.location.href='/'
    })
  }

}])
