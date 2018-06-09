import _assign from 'lodash/fp/assign';
import _get from 'lodash/fp/get';
import _isUndefined from 'lodash/fp/isUndefined';
import _set from 'lodash/fp/set';
import _transform from 'lodash/fp/transform';
import { SKIP } from '../core/skip';

const setMutable = _set.convert({ immutable: false });
const transformWithKey = _transform.convert({ cap: false });

/**
 * @typedef {ModelSchema<OBJECT, Object>} ObjectModelSchema
 * @template OBJECT
 */

/**
 * @typedef {Object<string, PropertySchema>} ObjectSchema
 */

/**
 * @typedef {Object} PropertySchema
 * @property {string} [property]
 * @property {PropertyTransformer<OBJECT, JSON>} serialize
 * @property {PropertyTransformer<JSON, OBJECT>} deserialize
 * @template OBJECT, JSON
 */

/**
 * @callback PropertyTransformer
 * @param {SOURCE} value
 * @param {Object} source
 * @param {string} property
 * @returns {TARGET}
 * @template SOURCE, TARGET
 */

/**
 * @private
 * @function
 * @param {function(PropertySchema, string): string} getSourceProperty
 * @param {function(PropertySchema): PropertyTransformer} getTransformer
 * @param {function(PropertySchema, string): string} getTargetProperty
 * @param {ObjectSchema} schema
 * @returns {function(Object): Object}
 */
const transform = (getSourceProperty, getTransformer, getTargetProperty, schema) =>
  source => source && transformWithKey((target, modelSchema, property) => {
    const sourceProperty = getSourceProperty(modelSchema, property);
    const sourceValue = _get(sourceProperty, source);
    const transformed = getTransformer(modelSchema)(sourceValue, source, sourceProperty);
    const targetValue = _isUndefined(transformed) ? null : transformed;
    const targetProperty = getTargetProperty(modelSchema, property);

    if (targetValue !== SKIP) {
      setMutable(targetProperty, targetValue, target);
    }
  }, {}, schema);

/**
 * @private
 * @function
 * @param {PropertySchema} schema
 * @param {string} property
 * @return {string}
 */
const getJsonProperty = (schema, property) => schema.property || property;

/**
 * @private
 * @function
 * @param {PropertySchema} schema
 * @param {string} property
 * @return {string}
 */
const getObjectProperty = (schema, property) => property;

/**
 * @function
 * @param {ObjectSchema} schema
 * @returns {ObjectModelSchema<OBJECT>}
 * @template OBJECT
 */
export const object = schema => _assign(schema, {
  serialize: transform(getObjectProperty, _get('serialize'), getJsonProperty, schema),
  deserialize: transform(getJsonProperty, _get('deserialize'), getObjectProperty, schema),
});

export default object;
