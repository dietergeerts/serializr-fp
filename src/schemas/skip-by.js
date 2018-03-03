import _assign from 'lodash/fp/assign';
import _curry from 'lodash/fp/curry';
import _flow from 'lodash/fp/flow';
import SKIP from '../core/skip';

/**
 * Skip the value after serialization if predicate returns true,
 * in case the BE doesn't want to receive certain values.
 *
 * Some REST API's rather have the key not being there than having a certain
 * value they see as a nil value, like `null`, `""` or `{}`. In that case, this
 * skip schema can be used with a predicate function to check.
 *
 * @function
 * @param {function(OBJECT): boolean} predicate
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const skipBy = _curry((predicate, schema) => _assign(schema, {
    serialize: _flow(schema.serialize, value => predicate(value) ? SKIP : value),
}));

export default skipBy;
