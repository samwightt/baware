import './showBlobs.html';
import { Template } from 'meteor/templating';
import { Conversations } from '../collections.js';

Template.showblobs.helpers({
  blobs: function() {
    return Conversations.find({state: {$gte: 2}});
  }
})