import { Meteor } from 'meteor/meteor';
import { People, Conversations } from './collections.js';

Meteor.startup(() => {
  if (People.find({}).count() == 0) {
    People.insert({
      phone: "+12056502938",
      location: "home",
      state: 0
    });
    People.insert({
      phone: "+12564992183",
      location: "elsewhere",
      state: 1
    });
    People.insert({
      phone: "+14438582322",
      location: "unknown",
      state: 1
    });
  }
  if (Conversations.find({}).count() == 0) {
    Conversations.insert({
      state: 0,
      blobs: [],
      phone: "+12056502938"
    });
    Conversations.insert({
      state: 3,
      blobs: ["I'm at the park.", "People are in danger."],
      phone: "+12564992183"
    });
    Conversations.insert({
      state: 3,
      blobs: ["I'm at the office.", "Other people are in danger, not me."],
      phone: "+14438582322"
    });
  }
});

