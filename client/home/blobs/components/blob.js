import './blob.html'
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

Template.singlenumber.onCreated(function singlenumberOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('buttonClosed', true);
});

Template.singlenumber.onRendered(function() {
  this.$('.singleitem').transition('fade in up');
})

Template.singlenumber.helpers({
  blobs: function() {
    const instance = Template.instance();
    if (instance.state.get('buttonClosed')) {
      return this.document.blobs.sort(function(a, b) { return b.lastEdited - a.lastEdited }).slice(0, 3);
    }
    else return this.document.blobs.sort(function(a, b) { return b.lastEdited - a.lastEdited });
  },
  opened: function() {
    return Template.instance().state.get('buttonClosed');
  }
});

Template.singlenumber.events({
  'click #showMore': function(e) {
    e.preventDefault();
    const instance = Template.instance();
    instance.state.set('buttonClosed', !instance.state.get('buttonClosed'));
  }
});

Template.blobview.onRendered(function() {
  this.$('.item').transition('fade in up');
});