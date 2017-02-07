import EmberObject from 'ember-object';

export default EmberObject.extend({
  parent: null,
  key: null,

  unknownProperty(key) {
    return this.getValue(key);
  },

  setUnknownProperty(key, value) {
    this.setValue(key, value);
    return value;
  },

  getValue(key) {
    return this.parent.getValue(this.key + '.' + key);
  },

  setValue(key, value) {
    this.parent.setValue(this.key + '.' + key, value);
  }
});
