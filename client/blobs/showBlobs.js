import './showBlobs.html';
import './components/blob.js';
import { Template } from 'meteor/templating';
import { Conversations } from '../collections.js';

Template.showblobs.helpers({
  blobs: function() {
    return Conversations.find({state: {$gte: 2}}, {sort: { lastEdited: -1 }});
  }
});