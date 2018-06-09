import _assign from 'lodash/fp/assign';

/**
 * @function
 * @param {string} property
 * @param {ModelSchema<OBJECT, JSON>
 *     |PropertySchema<OBJECT, JSON>} schema
 * @returns {PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const alias = (property, schema) => _assign(schema, { property });

export default alias;
