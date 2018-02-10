import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import _isUndefined from 'lodash/fp/isUndefined';
import {deserialize, serialize, SKIP} from "./index";

/**
 * @type {PropertySchema}
 */
export const primitive = {
    serialize: value => value,
    deserialize: value => value,
};

/**
 * @type {PropertySchema}
 */
export const date = {
    serialize: value => value && value.toISOString(),
    deserialize: value => value && new Date(value),
};

/**
 * @param {!ModelSchema} schema
 * @returns {!PropertySchema}
 */
export const object = schema => ({
    serialize: serialize(schema),
    deserialize: deserialize(schema),
});

/**
 * @param {!ModelSchema} schema
 * @returns {!PropertySchema}
 */
export const array = object;

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
