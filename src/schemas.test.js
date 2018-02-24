import demand from 'must';
import sinon from 'sinon';
import _clone from 'lodash/fp/clone';
import _noop from 'lodash/fp/noop';
import './../test/setup';
import {PRIMITIVE, DATE, DATE_ONLY, alias, computed, withDefault, withJsonDefault} from "./schemas";
import {SKIP} from "./index";

describe('PRIMITIVE', () => {

    it(`must serialize to the same primitive value as given. 
    Though JSON doesn't know undefined, this will be handled by the main
    serializer function, to not break or interfere with wrapper schema's,
    like the optional, which will check on undefined values.
    Primitive values are given by value, thus immutable.`,
        () => {
            demand(PRIMITIVE.serialize('string')).to.equal('string');
            demand(PRIMITIVE.serialize(10)).to.equal(10);
            demand(PRIMITIVE.serialize(true)).to.equal(true);
            demand(PRIMITIVE.serialize(null)).to.equal(null);
            demand(PRIMITIVE.serialize(undefined)).to.equal(undefined);
        });

    it(`must deserialize to the same primitive value as given. 
    Primitive values are given by value, thus immutable.`,
        () => {
            demand(PRIMITIVE.deserialize('string')).to.equal('string');
            demand(PRIMITIVE.deserialize(10)).to.equal(10);
            demand(PRIMITIVE.deserialize(true)).to.equal(true);
            demand(PRIMITIVE.deserialize(null)).to.equal(null);
        });
});

/**
 * @private
 * @param {!PropertySchema} schema
 * @returns {function(): void}
 */
const testDateDeserialization = schema => () => {
    const date = new Date(2018, 2, 13, 21, 32, 0, 0);
    demand(schema.deserialize(date.toJSON())).to.eql(date);
    demand(schema.deserialize(null)).to.equal(null);
};

describe('DATE', () => {

    it(`must serialize to an ISO date string if there is a value,
    otherwise it should return the undefined/null value instead.`,
        () => {
            const date = new Date(2018, 2, 13, 21, 32, 0, 0);
            demand(DATE.serialize(date)).to.equal(date.toJSON());
            demand(DATE.serialize(null)).to.equal(null);
            demand(DATE.serialize(undefined)).to.equal(undefined);
        });

    it(`must deserialize to a date object if there is a value,
    otherwise it should return the null value instead.`,
        testDateDeserialization(DATE));
});

describe('DATE_ONLY', () => {

    it(`must serialize to date part of ISO date string if there is a value,
    otherwise it should return the undefined/null value instead.`,
        () => {
            const date = new Date(2018, 2, 13, 21, 32, 0, 0);
            demand(DATE_ONLY.serialize(date)).to.equal('2018-03-13');
            demand(DATE_ONLY.serialize(null)).to.equal(null);
            demand(DATE_ONLY.serialize(undefined)).to.equal(undefined);
        });

    it(`must deserialize the same as the DATE schema,
    as JavaScript doesn't know date-only dates.`,
        testDateDeserialization(DATE_ONLY));
});

describe('object', () => {

    it(`must serialize`);

    it(`must deserialize`);
});

describe('array', () => {

    it(`must serialize`);

    it(`must deserialize`);
});

describe('alias', () => {

    it(`must add the property alias to the schema,
    leaving the (de)serializer functions alone,
    and returning a new schema (for immutability).`,
        () => {
            const aliased = alias('ALIAS', PRIMITIVE);
            demand(aliased).to.have.property('property', 'ALIAS');
            demand(aliased.serialize).to.equal(PRIMITIVE.serialize);
            demand(aliased.deserialize).to.equal(PRIMITIVE.deserialize);
            demand(aliased).to.not.equal(PRIMITIVE);
        });
});

describe('optional', () => {

    it(`must serialize`);

    it(`must deserialize`);
});

describe('computed', () => {

    it(`must skip serialization, as it's a computed value,
    which is hard to revert in many cases, and would make this library
    way complex than needed due to the need to map to multiple properties.`,
        () => {
            const schema = computed(_noop);
            demand(schema.serialize({})).to.equal(SKIP);
        });

    it(`must deserialize`);
});

/**
 * @private
 * @param {function(*, !PropertySchema): !PropertySchema} withDefaultSchema
 */
const testWithDefaultSchemaSerialization = withDefaultSchema => {

    it(`must use the serializer of the given schema directly,
    as defaults are only meant to be used on deserialization,
    where we have no control over the actual json coming through.`,
        () => {
            const primitive = _clone(PRIMITIVE);
            sinon.spy(primitive, 'serialize');
            const schema = withDefaultSchema('B', primitive);

            demand(schema.serialize('A')).to.eql('A');
            demand(primitive.serialize).to.be.calledOnce();
            demand(primitive.serialize).to.be.calledWith('A');

            demand(schema.serialize()).to.eql(undefined);
            demand(primitive.serialize).to.be.calledTwice();
            demand(primitive.serialize).to.be.calledWith();
        });
};

describe('withDefault', () => {

    testWithDefaultSchemaSerialization(withDefault);

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

describe('withJsonDefault', () => {

    testWithDefaultSchemaSerialization(withJsonDefault);

    it(`must deserialize with the deserializer of the given schema,
    but where the value is change to the default if it was undefined.
    This can be used in case we know the source schema doesn't work otherwise.`,
        () => {
            const primitive = _clone(PRIMITIVE);
            sinon.spy(primitive, 'deserialize');
            const schema = withJsonDefault('B', primitive);

            demand(schema.deserialize('A')).to.eql('A');
            demand(primitive.deserialize).to.be.calledOnce();
            demand(primitive.deserialize).to.be.calledWith('A');

            demand(schema.deserialize()).to.eql('B');
            demand(primitive.deserialize).to.be.calledTwice();
            demand(primitive.deserialize).to.be.calledWith('B');
        });
});
