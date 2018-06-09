import demand from 'must/must';
import './../../test/setup';
import { alias } from './alias';
import { PRIMITIVE } from './primitive';

describe('alias', () => {
  it(`must add the property alias to the schema,
    leaving the (de)serializer functions alone,
    and returning a new schema (for immutability).`, () => {
    const aliased = alias('ALIAS', PRIMITIVE);
    demand(aliased).to.have.property('property', 'ALIAS');
    demand(aliased.serialize).to.equal(PRIMITIVE.serialize);
    demand(aliased.deserialize).to.equal(PRIMITIVE.deserialize);
    demand(aliased).to.not.equal(PRIMITIVE);
  });
});
