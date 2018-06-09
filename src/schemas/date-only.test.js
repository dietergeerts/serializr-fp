import demand from 'must/must';
import './../../test/setup';
import { DATE_ONLY } from './date-only';

describe('DATE_ONLY', () => {
  it(`must serialize to date part of ISO date string if there is a value,
    otherwise it should return the undefined/null value instead.`, () => {
    const date = new Date(2018, 2, 13, 21, 32, 0, 0);
    demand(DATE_ONLY.serialize(date)).to.equal('2018-03-13');
    demand(DATE_ONLY.serialize(null)).to.equal(null);
    demand(DATE_ONLY.serialize(undefined)).to.equal(undefined);
  });

  it(`must deserialize to a date object if there is a value,
    otherwise it should return the null value instead,
    as JavaScript doesn't know date-only dates.`, () => {
    const date = new Date(2018, 2, 13, 21, 32, 0, 0);
    demand(DATE_ONLY.deserialize(date.toJSON())).to.eql(date);
    demand(DATE_ONLY.deserialize(null)).to.equal(null);
  });
});
