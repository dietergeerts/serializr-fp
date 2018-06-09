import demand from 'must/must';
import _noop from 'lodash/fp/noop';
import './../../test/setup';
import { computed } from './computed';
import { SKIP } from '../core/skip';

describe('computed', () => {
  it(`must skip serialization, as it's a computed value,
    which is hard to revert in many cases, and would make this library
    way complex than needed due to the need to map to multiple properties.`, () => {
    const schema = computed(_noop);
    demand(schema.serialize({})).to.equal(SKIP);
  });

  it('must deserialize');
});
