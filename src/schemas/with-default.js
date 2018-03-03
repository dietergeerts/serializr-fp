import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import _isUndefined from 'lodash/fp/isUndefined';

/**
 * Use a default value after deserialization,
 * in cae the value turns up undefined.
 *
 * @function
 * @param {OBJECT} defaultValue
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {ModelSchema<OBJECT, JSON>
 *       |PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const withDefault = (defaultValue, schema) => _assign(schema, {
    deserialize: _flow(schema.deserialize, value => _isUndefined(value) ? defaultValue : value),
});

export default withDefault;
