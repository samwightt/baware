import { Meteor } from 'meteor/meteor';
import { People, Conversations } from './collections.js';

Meteor.methods({
  'sendMassTexts': function(latitude, longitude, miles) {
    var latLngMiles = miles / 69;

    var phoneString = "";

    People.find({
     latitude: {
        "$gte": latitude - latLngMiles,
        "$lte": latitude + latLngMiles
      },
      longitude: {
        "$gte": longitude - latLngMiles,
        "$lte": longitude + latLngMiles
      }
    }).forEach(function(document) {
      phoneString += " " + document.phone;
    });

    exec = Npm.require('child_process').exec;
    exec("cd ~/Code/meteor/texting-api && python3 text.py" + phoneString, function(error, stdout, stderr) {
      if (error) console.log(error);
    });
  }
})