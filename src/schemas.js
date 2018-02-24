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
 * @param {!(ModelSchema|PropertySchema)} schema
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
 * @private
 * @param {!PropertyTransformer} transformer
 * @returns {!PropertyTransformer}
 */
const optionalTransformer = transformer => _flow(transformer, skipIfUndefined);

/**
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const optional = schema => ({
    serialize: optionalTransformer(schema.serialize),
    deserialize: optionalTransformer(schema.deserialize),
});

/**
 * @param {!function(json: !Object): *} compute
 * @returns {!PropertySchema}
 */
export const computed = compute => ({
    serialize: () => SKIP,
    deserialize: (value, json) => compute(json),
});

/**
 * @private
 * @param {function(...function): !PropertyTransformer} flow
 * @returns {function(*, !PropertySchema): !PropertySchema}
 */
const withDefaultFlow = flow => (defaultValue, schema) => ({
    serialize: schema.serialize,
    deserialize: (value, ...args) => flow(
        schema.deserialize,
        value => _isUndefined(value) ? defaultValue : value
    )(value, ...args),
});

/**
 * @param {*} defaultValue
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const withDefault = withDefaultFlow(_flow);

/**
 * @param {*} defaultValue
 * @param {!PropertySchema} schema
 * @returns {!PropertySchema}
 */
export const withJsonDefault = withDefaultFlow(_overArgs);
