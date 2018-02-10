import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import _isUndefined from 'lodash/fp/isUndefined';
import {deserialize, serialize, SKIP} from "./index";

/**
 * @type {PropertySchema}
 */
export const PRIMITIVE = {
    serialize: value => value,
    deserialize: value => value,
};

/**
 * @type {PropertySchema}
 */
export const DATE = {
    serialize: value => value && value.toISOString(),
    deserialize: value => value && new Date(value),
};

/**
 * @private
 * @param {!ModelSchema|PropertySchema} schema
 * @returns {!PropertySchema}
 */
const complex = schema => ({
    serialize: serialize(schema),
    deserialize: deserialize(schema),
});

/**
 * @param {!ModelSchema} schema
 * @returns {!PropertySchema}
 */
export const object = complex;

/**
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const array = complex;

/**
 * @param {!string} property
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const alias = (property, schema) => _assign(schema, {property});

/**
 * @private
 * @param {*} value
 * @returns {*|SKIP}
 */
const skipIfUndefined = value => _isUndefined(value) ? SKIP : value;

/**
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const optional = schema => ({
    serialize: _flow(schema.serialize, skipIfUndefined),
    deserialize: _flow(schema.deserialize, skipIfUndefined),
});

/**
 * @param {!function(json: !Object): *} compute
 * @returns {!PropertySchema}
 */
export const computed = compute => ({
    serialize: () => SKIP,
    deserialize: (value, json) => compute(json),
});
