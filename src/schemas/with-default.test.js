import sinon from 'sinon';
import demand from 'must/must';
import _clone from 'lodash/fp/clone';
import './../../test/setup';
import PRIMITIVE from './primitive';
import withDefault from './with-default';

describe('withDefault', () => {

    it(`must use the serializer of the given schema directly,
    as defaults are only meant to be used on deserialization,
    where we have no control over the actual json coming through.`,
        () => {
            const primitive = _clone(PRIMITIVE);
            sinon.spy(primitive, 'serialize');
            const schema = withDefault('B', primitive);

            demand(schema.serialize('A')).to.eql('A');
            demand(primitive.serialize).to.be.calledOnce();
            demand(primitive.serialize).to.be.calledWith('A');

            demand(schema.serialize()).to.eql(undefined);
            demand(primitive.serialize).to.be.calledTwice();
            demand(primitive.serialize).to.be.calledWith();
        });

    it(`must deserialize with the deserializer of the given schema first,
    then it should check if the value is undefined and return the default if so.
    So if the source schema produces an undefined, we still get something.`,
        () => {
            const primitive = _clone(PRIMITIVE);
            sinon.spy(primitive, 'deserialize');
            const schema = withDefault('B', primitive);

            demand(schema.deserialize('A')).to.eql('A');
            demand(primitive.deserialize).to.be.calledOnce();
            demand(primitive.deserialize).to.be.calledWith('A');

            demand(schema.deserialize()).to.eql('B');
            demand(primitive.deserialize).to.be.calledTwice();
            demand(primitive.deserialize).to.be.calledWith();
        });
});
