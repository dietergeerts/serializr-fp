import demand from 'must/must';
import './../../test/setup';
import PRIMITIVE from './primitive';

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
