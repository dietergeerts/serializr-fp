import _assign from 'lodash/fp/assign';
import _curry from 'lodash/fp/curry';
import _flow from 'lodash/fp/flow';
import _isPlainObject from 'lodash/fp/isPlainObject';
import _omitBy from 'lodash/fp/omitBy';

/**
 * Omit values after serialization.
 *
 * While `skipBy` is useful to skip single values from an object, there are
 * situations where you want to skip all properties if they are a certain value.
 * In this case, it's easier to use this `omitBy` schema on the `object` schema.
 *
 * @see {@link skipBy}
 *
 * @function
 * @param {function(*): boolean} predicate
 * @param {ObjectModelSchema<OBJECT>} schema
 * @returns {ObjectModelSchema<OBJECT>}
 * @template OBJECT
 */
export const omitBy = _curry((predicate, schema) => _assign(schema, {
  serialize: _flow(
    schema.serialize,
    value => (_isPlainObject(value) ? _omitBy(predicate, value) : value),
  ),
}));

export default omitBy;
