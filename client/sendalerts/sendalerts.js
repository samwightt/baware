import './sendalerts.html';
import { People } from '../collections';
var places = require('places.js');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

Template.sendalerts.onRendered(function() {
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftd2lnaHR0IiwiYSI6ImNqcm9sbm9laDE0bjg0M210OXZ4eDJpaGgifQ.5PgSfAr-1ArDWr3VpsIKCA';
  var map = new mapboxgl.Map({
    container: 'alertmapid',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0,0],
    zoom: 12
  }); 
  var placesAutocomplete = places({
    appId: 'plSN636Q9PDH',
    apiKey: '0f72f869d50f428def85151a5f4b0888',
    container: document.querySelector('#alertplacesearch'),
    zoom: 11,
    center: [100.507, 13.745],
    zoom: 9
  });
  
  var latitude, longitude;

  placesAutocomplete.on('change', function resultSelected(e) {
    latitude = e.suggestion.latlng.lat;
    longitude = e.suggestion.latlng.lng;
    map.jumpTo({center: [longitude, latitude], zoom: 15});
  });

  $('#alertform').on('submit', function(e) {
    e.preventDefault();
    
    var miles = parseInt($("#alertradius").val());

    Meteor.call('sendMassTexts', latitude, longitude, miles);

    $("#alertmodal").modal('hide');
  });
});