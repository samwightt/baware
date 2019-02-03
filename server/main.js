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
});

