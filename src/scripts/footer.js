$(function() {
  'use strict';
});

function initMap() {
  var myLatLng = {lat: 39.7320, lng: -104.9839};

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 15,
    center: myLatLng,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'We are here!'
  });
}
