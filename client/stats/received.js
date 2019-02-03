import './received.html';
import { Conversations } from '../collections.js';
import { Template } from 'meteor/templating';

Template.received.helpers({
  numReceived: function() {
    return Conversations.find({state: 3}).count();
  }
})