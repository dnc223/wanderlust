'use strict';

angular.module('wanderlustApp')

  .factory('GoExplore', function(){
    //this function activates on ng-click for the button "Go Exploring!"
    return {
      glhf: function(){
        alert('good luck, have fun!');
      }
    };
  })

  .controller('ShowtourCtrl', function ($scope, instagram, GoExplore, toursFactory, User, Auth) {
    $scope.glhf = function(){
      var currentUser = Auth.getCurrentUser();
      User.addTour({id: currentUser._id}, {'tourObject': this.tours});
      return GoExplore.glhf();      
    }; 
    $scope.tours = toursFactory.tours[toursFactory.selectedTour];
    
    console.log($scope.tours.city);
    
    $scope.pics = [];

    instagram.fetch(function(data) {
      for (var i = 0; i < 6; i++) {
        $scope.pics[i] = data[i].images.thumbnail.url;
      }
    }, cleanName($scope.tours.neighborhood) );
    
    function cleanName(neighborhood) {
      return neighborhood[0].split(" ").join("").split("-").join("");
    }
    function longestWord(str) {
      var arr = str.split(" ");
      return arr.sort(function(a, b) {return b.length - a.length;})[0];
    }

    console.log(longestWord($scope.tours.spots[0].task));
    $scope.taskPics = [];


    console.log($scope.tours);
    for (var j = 0; j < $scope.tours.spots.length; j++) {
      var k = j;
      instagram.fetch(function(data) {
          $scope.tours.spots[k].pic = data[0].images.thumbnail.url;
      }, longestWord($scope.tours.spots[j].task));
    }

  });
