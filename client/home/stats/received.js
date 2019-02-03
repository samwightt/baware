import './received.html';
import { Conversations } from '../../collections.js';
import { Template } from 'meteor/templating';

Template.received.helpers({
  numReceived: function() {
    return Conversations.find({state: { "$gte": 3 }}).count();
  }
})

Template.received.onRendered(function() {
  this.$('.segment').transition('fade in up');
});