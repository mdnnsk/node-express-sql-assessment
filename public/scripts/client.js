var myApp = angular.module('myApp', []);


myApp.controller( 'animalControl', ['$scope','$http', function($scope, $http){
  $http({
    method: 'GET',
    url: '/getAnimals'
  }).then(function (data ){
    console.log("/getAnimals data: " + data);
      showAnimals(data);
    } // end success
  ); //end ajax

  $scope.doShitNow = function(){
    var newAnimal={
      "type": $scope.animalIn,
      "quantity": randomNumber()
    };//end object


    console.log(newAnimal);
    //start ajax call
    $http({
      method: 'POST',
      url: '/submitAnimals',
      data: newAnimal
    }).then(function( response ){
      console.table("In /submitAnimals return with data: " + response.data);
        showAnimals(response.data);
      }, function(err){
        console.log("In error with: " + err);
      }); // end then functio  //end http
  };
  //function to generate quantity of animals submitted
  function randomNumber(){
    return Math.floor(Math.random() * (1 + 100 - 1) + 1);
  }
  //function to display animals on the dom
  function showAnimals( animals ){
    console.log ("in showAnimals: " + animals.data + " with a length of: " + animals.data.length);
    for( i=0; i<animals.data.length-1; i++ )
    {
      $scope.animalsOut +=" "+ animals.data[i].animal_quantity + " " + animals.data[i].animal_type + "(s)";
    }
  }

}]);
