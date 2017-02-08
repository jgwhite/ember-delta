import EmberObject from 'ember-object';
import Relay from './-private/relay';
import computed from 'ember-computed';
import { typeOf } from 'ember-utils';

export default EmberObject.extend({
  source: null,
  values: null,

  changes: computed('values', function() {
    let values = this.get('values');
    let keys = Object.keys(values);

    return keys.map(key => {
      let oldValue = this.get(`source.${key}`);
      let newValue = values[key];

      return { key, oldValue, newValue };
    });
  }),

  init() {
    this._super(...arguments);
    this.values = {};
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
    let [root] = key.split('.');

    if (value !== original) {
      values[key] = value;
    } else {
      Reflect.deleteProperty(values, key);
    }

    this.notifyPropertyChange(root);
    this.notifyPropertyChange('values');
  },

  getValue(key) {
    let values = this.get('values');

    if (values.hasOwnProperty(key)) {
      return values[key];
    }

    let original = this.get(`source.${key}`);
    let parent = this;

    switch (typeOf(original)) {
      case 'instance':
      case 'object':
        return Relay.create({ parent, key });
      default:
        return original;
    }
  }
});
