import { Mongo } from 'meteor/mongo';

export const People = new Mongo.Collection('people');
export const Conversations = new Mongo.Collection('conversations');