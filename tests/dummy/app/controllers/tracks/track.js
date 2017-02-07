import Controller from 'ember-controller';
import computed from 'ember-computed';
import Patch from 'ember-delta/patch';

export default Controller.extend({
  patch: computed('model', function() {
    let source = this.get('model');
    return Patch.create({ source });
  }),

  actions: {
    patch(patch, key, value) {
      patch.patch(key, value);
    }
  }
});
