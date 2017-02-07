import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tracks', { path: '' }, function() {
    this.route('track', { path: ':track_id' });
  });
});

export default Router;
