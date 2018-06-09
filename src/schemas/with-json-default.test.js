import sinon from 'sinon';
import demand from 'must/must';
import _clone from 'lodash/fp/clone';
import './../../test/setup';
import { PRIMITIVE } from './primitive';
import { withJsonDefault } from './with-json-default';

describe('withJsonDefault', () => {
  it(`must use the serializer of the given schema directly,
    as defaults are only meant to be used on deserialization,
    where we have no control over the actual json coming through.`, () => {
    const primitive = _clone(PRIMITIVE);
    sinon.spy(primitive, 'serialize');
    const schema = withJsonDefault('B', primitive);

    demand(schema.serialize('A')).to.eql('A');
    demand(primitive.serialize).to.be.calledOnce();
    demand(primitive.serialize).to.be.calledWith('A');

    demand(schema.serialize()).to.eql(undefined);
    demand(primitive.serialize).to.be.calledTwice();
    demand(primitive.serialize).to.be.calledWith();
  });

  it(`must deserialize with the deserializer of the given schema,
    but where the value is change to the default if it was undefined.
    This can be used in case we know the source schema doesn't work otherwise.`, () => {
    const primitive = _clone(PRIMITIVE);
    sinon.spy(primitive, 'deserialize');
    const schema = withJsonDefault('B', primitive);

    demand(schema.deserialize('A')).to.eql('A');
    demand(primitive.deserialize).to.be.calledOnce();
    demand(primitive.deserialize).to.be.calledWith('A');

    demand(schema.deserialize(undefined)).to.eql('B');
    demand(primitive.deserialize).to.be.calledTwice();
    demand(primitive.deserialize).to.be.calledWith('B');
  });
});
