import './add.html';
var places = require('places.js');
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

Template.add.onRendered(function() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2Ftd2lnaHR0IiwiYSI6ImNqcm9sbm9laDE0bjg0M210OXZ4eDJpaGgifQ.5PgSfAr-1ArDWr3VpsIKCA';
  var map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v11'
  });
  var placesAutocomplete = places({
    appId: 'plSN636Q9PDH',
    apiKey: '0f72f869d50f428def85151a5f4b0888',
    container: document.querySelector('#addplacesearch'),
    zoom: 11,
    center: [100.507, 13.745],
    zoom: 9
  });

  var latitude, longitude;

  placesAutocomplete.on('change', function resultSelected(e) {
    latitude = e.suggestion.latlng.lat;
    longitude = e.suggestion.latlng.lng;
  });

  $('#addform').on('submit', function(e) {
    e.preventDefault();
    map.flyTo({center: [longitude, latitude]});
  });
});