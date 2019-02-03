import './sent.html';
import { Template } from 'meteor/templating';
import { Conversations } from '../collections';

Template.sent.helpers({
  numSent: function() {
    return Conversations.find({}).count();
  }
})