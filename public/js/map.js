var map;
var marker;
var infowindow = new google.maps.InfoWindow();

function getLocation(){
  var options = {timeout: 5000};
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(renderMap, showError, options);
    } else {
      alert("Geolocation is not supported by this browser.");
      initializeMap();
  }
}

function showError(error){
  if (error) {
    initializeMap();
  }
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
  }

function createMarker(latlon, title, iwContent, markerid){
  var marker = new google.maps.Marker({
    position: latlon,
    title: title,
    map: map,
    clickable: true
  });
  marker.info = new google.maps.InfoWindow({
    content: '<a href="/projects/'+markerid+'"><h5>'+title+'</h5></a>'+'<p>'+iwContent+'</p>'
  });
  google.maps.event.addListener(marker, 'click', function() {
    marker.info.open(map, marker);
  });
}

function renderMap(position){  
  var cntr = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var mapOptions = {
    center: cntr,
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  for (var i = 0; i < allProjects.length; i++) {
    var markerLatLng = new google.maps.LatLng(allProjects[i].coordinates.lat, allProjects[i].coordinates.lng);
    var markerTitle = allProjects[i].title;
    var iwContent = allProjects[i].description;
    var markerID = allProjects[i]._id;
    createMarker(markerLatLng, markerTitle, iwContent, markerID);
  }
}

function initializeMap() {
  var mapOptions = {
    center: new google.maps.LatLng(39.500, -105.000),
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  for (var i = 0; i < allProjects.length; i++) {
    var markerLatLng = new google.maps.LatLng(allProjects[i].coordinates.lat, allProjects[i].coordinates.lng);
    var markerTitle = allProjects[i].title;
    var iwContent = allProjects[i].description;
    var markerID = allProjects[i]._id;
    createMarker(markerLatLng, markerTitle, iwContent, markerID);
  }
}

$(document).ready(function() {
  
  getLocation();

});