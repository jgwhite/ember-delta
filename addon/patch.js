import EmberObject from 'ember-object';
import Relay from './-private/relay';
import computed, { notEmpty, not } from 'ember-computed';

export default EmberObject.extend({
  source: null,
  values: null,

  changedKeys: computed('values', function() {
    return Object.keys(this.get('values'));
  }),
  hasChanges: notEmpty('changedKeys'),
  hasNoChanges: not('hasChanges'),

  init() {
    this._super(...arguments);
    this.set('values', {});
  },

  unknownProperty(key) {
    return this.getValue(key);
  },

  setUnknownProperty(key, value) {
    this.setValue(key, value);
    return value;
  },

  setValue(key, value) {
    let values = this.get('values');
    let original = this.get(`source.${key}`);
    let keyRoot = key.split('.')[0];

    if (value !== original) {
      values[key] = value;
    } else {
      Reflect.deleteProperty(values, key);
    }

    this.notifyPropertyChange(keyRoot);
    this.notifyPropertyChange('values');
  },

  getValue(key) {
    let values = this.get('values');
    let value = values[key];

    if (value) {
      return value;
    }

    let original = this.get(`source.${key}`);

    if (original instanceof EmberObject) {
      return Relay.create({ parent: this, key });
    } else {
      return original;
    }
  }
});
