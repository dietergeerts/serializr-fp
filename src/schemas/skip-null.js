import _isNil from 'lodash/fp/isNil';
import { skipBy } from './skip-by';

/**
 * Skip `null` value after serialization.
 *
 * Also checks undefined values, to avoid conflicts with required properties.
 * The required check is done as last and turns values into `null` if needed.
 *
 * @see {@link skipBy}
 *
 * @function
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const skipNull = skipBy(_isNil);

export default skipNull;
