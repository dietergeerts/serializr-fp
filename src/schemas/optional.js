import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import _isUndefined from 'lodash/fp/isUndefined';
import { SKIP } from '../core/skip';

/**
 * @private
 * @function
 * @param {*} value
 * @returns {*|SKIP}
 */
const skipIfUndefined = value => (_isUndefined(value) ? SKIP : value);

/**
 * @function
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const optional = schema => _assign(schema, {
  serialize: _flow(schema.serialize, skipIfUndefined),
  deserialize: _flow(schema.deserialize, skipIfUndefined),
});

export default optional;
