/**
 *  @module Schemas
 */
import _assign from 'lodash/fp/assign';
import _flow from 'lodash/fp/flow';
import _isUndefined from 'lodash/fp/isUndefined';
import _overArgs from 'lodash/fp/overArgs';
import {deserialize, serialize, SKIP} from "./core";

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
    serialize: value => value && value.toJSON(),
    deserialize: value => value && new Date(value),
};

/**
 * @type {PropertySchema}
 */
export const DATE_ONLY = _assign(DATE, {
    serialize: _flow(DATE.serialize, date => date && date.slice(0, 10)),
});

/**
 * @private
 * @function
 * @param {ModelSchema|PropertySchema} schema
 * @returns {PropertySchema}
 */
const complex = schema => ({
    serialize: serialize(schema),
    deserialize: deserialize(schema),
});

/**
 * @function
 * @param {ModelSchema} schema
 * @returns {PropertySchema}
 */
export const object = complex;

/**
 * @function
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const array = complex;

/**
 * @function
 * @param {string} property
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const alias = (property, schema) => _assign(schema, {property});

/**
 * @private
 * @function
 * @param {*} value
 * @returns {*|SKIP}
 */
const skipIfUndefined = value => _isUndefined(value) ? SKIP : value;

/**
 * @private
 * @function
 * @param {PropertyTransformer} transformer
 * @returns {PropertyTransformer}
 */
const optionalTransformer = transformer => _flow(transformer, skipIfUndefined);

/**
 * @function
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const optional = schema => ({
    serialize: optionalTransformer(schema.serialize),
    deserialize: optionalTransformer(schema.deserialize),
});

/**
 * @function
 * @param {function(!Object): *} compute
 * @returns {PropertySchema}
 */
export const computed = compute => ({
    serialize: () => SKIP,
    deserialize: (value, json) => compute(json),
});

/**
 * @private
 * @function
 * @param {function(...function): PropertyTransformer} flow
 * @returns {function(*, PropertySchema): PropertySchema}
 */
const withDefaultFlow = flow => (defaultValue, schema) => ({
    serialize: schema.serialize,
    deserialize: (value, ...args) => flow(
        schema.deserialize,
        value => _isUndefined(value) ? defaultValue : value
    )(value, ...args),
});

/**
 * @function
 * @param {*} value
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const withDefault = withDefaultFlow(_flow);

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
 * @param {*} value
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const withJsonDefault = withDefaultFlow(_overArgs);
