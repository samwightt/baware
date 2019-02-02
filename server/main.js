import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
    // code to run on server at startup
});

People = new Mongo.Collection('people');
Conversations = new Mongo.Collection('conversations');

People.insert({
    number: "+12056502938",
    location: "locationhere",
});
