import { Factory, faker } from 'ember-cli-mirage';
import { capitalize } from 'ember-string';

export default Factory.extend({
  name() {
    return capitalize(faker.lorem.word());
  },

  artwork() {
    return faker.image.image(256, 256);
  }
});
