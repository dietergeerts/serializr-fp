/**
 * @module serializrFp/core
 */
import _curry from 'lodash/fp/curry';
import _flow from 'lodash/fp/flow';
import _get from 'lodash/fp/get';
import _isArray from 'lodash/fp/isArray';
import _isFunction from 'lodash/fp/isFunction';
import _isPlainObject from 'lodash/fp/isPlainObject';
import _isUndefined from 'lodash/fp/isUndefined';
import _map from 'lodash/fp/map';
import _overEvery from 'lodash/fp/overEvery';
import _set from 'lodash/fp/set';
import _transform from 'lodash/fp/transform';

const _setMutable = _set.convert({immutable: false});
const _transformWithKey = _transform.convert({cap: false});

/**
 * @typedef {Object.<string, !PropertySchema>} ModelSchema
 */

/**
 * @typedef {Object} PropertySchema
 * @property {string} [property]
 * @property {PropertyTransformer} serialize
 * @property {PropertyTransformer} deserialize
 */

/**
 * @callback PropertyTransformer
 * @param {*} value
 * @param {Object} [source]
 * @param {string} [property]
 * @returns {*}
 */

/**
 * @typedef {function((ModelSchema|PropertySchema), (Object|Object[])): (Object|Object[])
 *          |function((ModelSchema|PropertySchema)): function((Object|Object[])): (Object|Object[])} ModelTransformer
 */

/**
 * @type {symbol}
 */
export const SKIP = Symbol('SKIP');

/**
 * @private
 * @function
 * @param {string} property
 * @returns {function(Object): boolean}
 */
const isFunctionProperty = property => _flow(_get(property), _isFunction);

/**
 * @private
 * @function
 * @param {ModelSchema|PropertySchema} schema
 * @returns {boolean}
 */
const isPropertySchema = _overEvery(isFunctionProperty('serialize'), isFunctionProperty('deserialize'));

/**
 * @private
 * @function
 * @param {function(PropertySchema, string): string} getSourceProperty
 * @param {function(PropertySchema): PropertyTransformer} getTransformer
 * @param {function(PropertySchema, string): string} getTargetProperty
 * @returns {ModelTransformer}
 */
const transform = (getSourceProperty, getTransformer, getTargetProperty) => {

    const transformer = _curry((schema, source) => {

        if (_isArray(source)) {
            return _map(transformer(schema), source);
        }

        if (isPropertySchema(schema)) {
            return getTransformer(schema)(source);
        }

        if (!_isPlainObject(source)) {
            return source;
        }

        return _transformWithKey((target, propertySchema, property) => {

            const sourceProperty = getSourceProperty(propertySchema, property);
            const sourceValue = _get(sourceProperty, source);
            const transformed = getTransformer(propertySchema)(sourceValue, source, sourceProperty);
            const targetValue = _isUndefined(transformed) ? null : transformed;
            const targetProperty = getTargetProperty(propertySchema, property);

            if (targetValue !== SKIP) {
                _setMutable(targetProperty, targetValue, target);
            }

        }, {}, schema);
    });

    return transformer;
};

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
 * @type {ModelTransformer}
 */
export const serialize = transform(getObjectProperty, _get('serialize'), getJsonProperty);

/**
 * @type {ModelTransformer}
 */
export const deserialize = transform(getJsonProperty, _get('deserialize'), getObjectProperty);
