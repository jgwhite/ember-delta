import Route from 'ember-route';

export default Route.extend({
  model({ track_id }) {
    return this.store.findRecord('track', track_id);
  },

  renderTemplate() {
    this.render({ into: 'application', outlet: 'detail' });
  }
});
