$(document).ready(function(){
  $.ajax({
    type: 'POST',
    url: '/getAnimals',
    success: function( data ){
      showAnimals(data);
    } // end success
  }); //end ajax
  $('#animalSub').on('click', function(){
    console.log("submit button clicked");
    var newAnimalType=$('#animalIn').val();
    var newAnimalQuantity = randomNumber();
    console.log("thank you for submitting your " + newAnimalQuantity + " " + newAnimalType + "(s)");
    // create new object
    var newAnimal={
      "type": newAnimalType,
      "quantity": newAnimalQuantity
    };//end object
    console.log(newAnimal);
    //start ajax call
    $.ajax({
      type: 'POST',
      url: '/submitAnimals',
      data: newAnimal,
      success: function( data ){
        showAnimals(data);
      } // end success
    }); //end ajax
  }); //end on animal submit click

  //function to generate quantity of animals submitted
  function randomNumber(){
    return Math.floor(Math.random() * (1 + 100 - 1) + 1);
  }
  //function to display animals on the dom
  function showAnimals( animals ){
    $('#outputDiv').children().remove();
    console.log ("in showAnimals: " + animals);
    for( i=0; i<animals.length; i++ )
    {
      var animalsOut = "<p>" + animals[i].animal_quantity + " " + animals[i].animal_type + "(s)</p>";
      $('#outputDiv').append( animalsOut );
    }}


}); //end on document ready
