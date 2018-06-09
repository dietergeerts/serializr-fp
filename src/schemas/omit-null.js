import _isNull from 'lodash/fp/isNull';
import { omitBy } from './omit-by';

/**
 * Omit `null` values after serialization.
 *
 * @see {@link omitBy}
 *
 * @function
 * @param {ObjectModelSchema<OBJECT>} schema
 * @returns {ObjectModelSchema<OBJECT>}
 * @template OBJECT
 */
export const omitNull = omitBy(_isNull);

export default omitNull;
