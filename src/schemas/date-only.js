import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import { DATE } from './date';

/**
 * @type {ModelSchema<Date, string>}
 */
export const DATE_ONLY = _assign(DATE, {
  serialize: _flow(DATE.serialize, date => date && date.slice(0, 10)),
});

export default DATE_ONLY;
