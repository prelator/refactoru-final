function getLocation(){
  var options = {timeout: 5000};
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(renderMap, showError, options);
    } else {
      console.log("Geolocation is not supported by this browser.");
      initializeMap();
  }
}

function showError(error){
  if (err) {
    initializeMap();
  }
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
    }
  }

function renderMap(position){  
  var cntr = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var mapOptions = {
    center: cntr || new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  for (var i = 0; i < allProjects.length; i++) {
    var newLatLng = new google.maps.LatLng(allProjects[i].coordinates.lat, allProjects[i].coordinates.lng);
    var marker = new google.maps.Marker({
      position: newLatLng,
      map: map,
      title: allProjects[i].title
    });
  }
}

function initializeMap() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  for (var i = 0; i < allProjects.length; i++) {
    var newLatLng = new google.maps.LatLng(allProjects[i].coordinates.lat, allProjects[i].coordinates.lng);
    var marker = new google.maps.Marker({
      position: newLatLng,
      map: map,
      title: allProjects[i].title
    });
  }
}

$(document).ready(function() {
  
  getLocation();

});