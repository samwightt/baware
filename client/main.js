import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';
import './home/home.js';
import './add/add.js';
import './sendalerts/sendalerts.js';

Template.mainwrapper.events({
  'click #addcitizens': function(e) {
    e.preventDefault();

    $("#addmodal").modal('show');
  },
  'click #alert': function(e) {
    e.preventDefault();

    $("#alertmodal").modal('show');
  }
});