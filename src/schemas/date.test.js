import demand from 'must/must';
import './../../test/setup';
import { DATE } from './date';

describe('DATE', () => {
  it(`must serialize to an ISO date string if there is a value,
    otherwise it should return the undefined/null value instead.`, () => {
    const date = new Date(2018, 2, 13, 21, 32, 0, 0);
    demand(DATE.serialize(date)).to.equal(date.toJSON());
    demand(DATE.serialize(null)).to.equal(null);
    demand(DATE.serialize(undefined)).to.equal(undefined);
  });

  it(`must deserialize to a date object if there is a value,
    otherwise it should return the null value instead.`, () => {
    const date = new Date(2018, 2, 13, 21, 32, 0, 0);
    demand(DATE.deserialize(date.toJSON())).to.eql(date);
    demand(DATE.deserialize(null)).to.equal(null);
  });
});
