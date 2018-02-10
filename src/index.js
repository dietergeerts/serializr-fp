import _curry from 'lodash/fp/curry';
import _get from 'lodash/fp/get';
import _isArray from 'lodash/fp/isArray';
import _isPlainObject from 'lodash/fp/isPlainObject';
import _isUndefined from 'lodash/fp/isUndefined';
import _map from 'lodash/fp/map';
import _set from 'lodash/fp/set';
import _transform from 'lodash/fp/transform';

const _setMutable = _set.convert({immutable: false});
const _transformWithKey = _transform.convert({cap: false});

/**
 * @typedef {Object.<string, !PropertySchema>} ModelSchema
 */

/**
 * @typedef {Object} PropertySchema
 * @property {!string} [property]
 * @property {!PropertyTransformer} serialize
 * @property {!PropertyTransformer} deserialize
 */

/**
 * @callback PropertyTransformer
 * @param {*} value
 * @param {!Object} source
 * @param {!string} property
 * @returns {*}
 */

/**
 * @typedef {function(!ModelSchema, !Object|Object[]): !Object|Object[]
 *          |function(!ModelSchema): function(!Object|Object[]): !Object|Object[]} ModelTransformer
 */

/**
 * @type {symbol}
 */
export const SKIP = Symbol('SKIP');

/**
 * @private
 * @param {function(!PropertySchema, !string): !string} getSourceProperty
 * @param {function(!PropertySchema): !PropertyTransformer} getTransformer
 * @param {function(!PropertySchema, !string): !string} getTargetProperty
 * @returns {!ModelTransformer}
 */
const transform = (getSourceProperty, getTransformer, getTargetProperty) => {

    const transformer = _curry((modelSchema, source) => {

        return _isArray(source)
            ? _map(transformer(modelSchema), source)
            : _isPlainObject(source)
                ? _transformWithKey((target, schema, property) => {

                    const sourceProperty = getSourceProperty(schema, property);
                    const sourceValue = _get(sourceProperty, source);
                    const transformed = getTransformer(schema)(sourceValue, source, sourceProperty);
                    const targetValue = _isUndefined(transformed) ? null : transformed;
                    const targetProperty = getTargetProperty(schema, property);

                    if (targetValue !== SKIP) {
                        _setMutable(targetProperty, targetValue, target);
                    }
                }, {}, source)
                : source;
    });

    return transformer;
};

/**
 * @private
 * @param {!PropertySchema} schema
 * @param {!string} property
 * @return {!string}
 */
const getJsonProperty = (schema, property) => schema.property || property;

/**
 * @private
 * @param {!PropertySchema} schema
 * @param {!string} property
 * @return {!string}
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
