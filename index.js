'use strict';

// Prints object(s) to the console for the first app
function getObject(url) {
  fetch(url)
    .then(response => response.json())
    .then(responseJson => 
      console.log(responseJson))
    .catch(error => alert("That wasn't supposed to happen. Try again."));
}

// Fetches the image objects and pushes them to showDogs for the second app
function getImages(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => 
        showDogs(responseJson))
      .catch(error => alert("That wasn't supposed to happen. Try again."));
  }

  // Fetches the image object and pushes it to showBreed for the third app
  function getRandomImage(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => 
        showBreed(responseJson))
      .catch(error => alert("That wasn't supposed to happen. Try again."));     
  }

  // Takes the fetched objects and displays the images for the second app
  function showDogs(responseJson) {
    console.log(responseJson);
    let imagesOfDogs = '';
    // Adds images to the string of images based on the number selected
    for(let i = $( "#numDogs" ).val()-1; i >= 0; i--){
        imagesOfDogs += '<img src="' + responseJson.message[i] + '">';
    };    
    // Replaces the existing HTML with the string of images
    $('.results-img').replaceWith(
      `<div class="results-img">
        ${imagesOfDogs}
      </div>`
    )
    // Unhides the images
    $('.results').removeClass('hidden');
  }

  // Takes the fetched object and displays an image based on the breed for the third app
  function showBreed(responseJson) {
    console.log(responseJson);
    // Displays an error if the breed isn't found.
    if(responseJson.status === "error"){
        $('.noBreed').removeClass('hidden');
    }
    // Replaces the existing HTML with image
    $('.results-img').replaceWith(
      `<img src="${responseJson.message}" class="results-img">`
    )
    // Unihides the image
    $('.results').removeClass('hidden');
  }

// These are the 3 form events from the 3 apps
function formEvent() {
  $('#firstForm').submit(event => {
    event.preventDefault();
    let dogURL = 'https://dog.ceo/api/breeds/image/random/' + $( "#numDogs" ).val();
    getObject(dogURL);
  });

  $('#secondForm').submit(event => {
    event.preventDefault();
    let dogURL = 'https://dog.ceo/api/breeds/image/random/' + $( "#numDogs" ).val();
    getImages(dogURL);
  });

  $('#thirdForm').submit(event => {
    event.preventDefault();
    let dogURL = 'https://dog.ceo/api/breed/' + $( "#dogBreed" ).val().toLowerCase() + '/images/random';
    if(!$('.noBreed').hasClass('hidden')){
        $('.noBreed').addClass('hidden');
    }
    getRandomImage(dogURL);
  });
}

$(function() {
  console.log('Loaded');
  formEvent();
});