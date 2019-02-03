import './blobStats.html';
import instantsearch from 'instantsearch.js';
import algoliasearch from 'algoliasearch';

Template.blobstats.onRendered(function() {
  const searchClient = algoliasearch('G3XAB62E9J', 'eba76d7ed87117be30ed4d2ca36a5bfe');
  const search = instantsearch({
    searchClient: searchClient,
    indexName: 'blobs',
    routing: false
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for dialogue.'
    })
  )

  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: '<h3>Phone: {{objectID}}: {{#blobs}}{{content}}{{/blobs}}</h3>'
      }
    })
  );

  search.start();
  this.$('.ais-SearchBox-input').wrap('<div class="ui big input"></div>');
  this.$('.ais-SearchBox-submit').addClass('ui button primary');
});