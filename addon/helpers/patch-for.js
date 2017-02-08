import Patch from '../patch';
import { helper } from 'ember-helper';

export function patchFor([source]) {
  return Patch.create({ source });
}

export default helper(patchFor);
