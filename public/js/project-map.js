var map;
var marker;
var infowindow = new google.maps.InfoWindow();

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

function initializeMap() {
  var markerLatLng = new google.maps.LatLng(myProject.coordinates.lat, myProject.coordinates.lng);
  var mapOptions = {
    center: markerLatLng,
    zoom: 14
  };  
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  
    var markerTitle = myProject.title;
    var iwContent = myProject.description;
    var markerID = myProject._id;
    createMarker(markerLatLng, markerTitle, iwContent, markerID);
  
}

$(document).ready(function() {
  
  initializeMap();

});