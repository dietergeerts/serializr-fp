import demand from 'must';
import {PRIMITIVE, DATE, DATE_ONLY} from "./schemas";

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

    it(`must serialize`);

    it(`must deserialize`);
});

describe('optional', () => {

    it(`must serialize`);

    it(`must deserialize`);
});

describe('computed', () => {

    it(`must serialize`);

    it(`must deserialize`);
});

describe('withDefault', () => {

    it(`must serialize`);

    it(`must deserialize`);
});
