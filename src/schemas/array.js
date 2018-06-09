import _assign from 'lodash/fp/assign';
import _map from 'lodash/fp/map';

/**
 * @function
 * @param {ModelSchema<OBJECT, JSON>} schema
 * @returns {ModelSchema<Array<OBJECT>, Array<JSON>>}
 * @template OBJECT, JSON
 */
export const array = schema => _assign(schema, {
  serialize: value => value && _map(schema.serialize, value),
  deserialize: value => value && _map(schema.deserialize, value),
});

export default array;
