'use strict';

angular.module('wanderlustApp')

  .directive('starRating', function(){
    return {
      restrict: 'E',
      template: '<span class="glyphicon glyphicon-star"></span>'
    };
  })

  .directive('tagPrice', function(){
    return {
      restrict: 'E',
      template: '<span class="glyphicon glyphicon-usd"></span>'
    };
  })

  .directive('tagCamera', function(){
    return {
      restrict: 'E',
      template: '<span class="glyphicon glyphicon-camera"></span>'
    };
  })

  .directive('tagTree', function(){
    return {
      restrict: 'E',
      template: '<span class="glyphicon glyphicon-tree-conifer"></span>'
    };
  })

  .factory('httpGET', function($http){
    return {
      getData: function(callback){
        return $http({
          method: 'GET',
          url: '/api/tours'
          }).success(function(data){
            callback(data);
          });
      }
    }
  })

  .factory('instagram', function($http){
    return {
      fetch: function(callback, tag) {
        var endPoint = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?" +
                       "client_id=435022a8bf534bf3a562a6e6194fe89b&callback=JSON_CALLBACK";
        $http.jsonp(endPoint).success(function(response) {
          callback(response.data);
        });
      }
    };
  })

  .controller('ToursCtrl', function ($scope, $location, $http, httpGET, toursFactory) {

    httpGET.getData(function(data){
      $scope.tours = data;
      toursFactory.tours = data;
    });

    //route to tour on click
    $scope.selectedTour = function(self){
        $location.path('/tours/showtour');
        toursFactory.selectedTour = self;
    };
  });
