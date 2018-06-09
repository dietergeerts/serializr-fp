import _assign from 'lodash/fp/assign';
import _isUndefined from 'lodash/fp/isUndefined';
import _overArgs from 'lodash/fp/overArgs';

/**
 * Use a default json value before deserialization,
 * in case the original value is undefined.
 *
 * This can be very handy in case a sub-object is undefined, but you want the
 * object to always be there, having it's properties initialized. For example,
 * a patient object which has a person property to hold all it's name parts. In
 * that case, you always want the person object to be there and have the name
 * parts set to null instead, so you can use it in a form to fill out.
 *
 * @function
 * @param {JSON} defaultValue
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {ModelSchema<OBJECT, JSON>
 *       |PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const withJsonDefault = (defaultValue, schema) => _assign(schema, {
  deserialize: _overArgs(schema.deserialize, value => (_isUndefined(value) ? defaultValue : value)),
});

export default withJsonDefault;
