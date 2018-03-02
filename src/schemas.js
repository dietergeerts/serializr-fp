/**
 *  @module serializrFp/schemas
 */
import _assign from 'lodash/fp/assign';
import _curry from 'lodash/fp/curry';
import _flow from 'lodash/fp/flow';
import _isNil from 'lodash/fp/isNil';
import _isNull from 'lodash/fp/isNull';
import _isPlainObject from 'lodash/fp/isPlainObject';
import _isUndefined from 'lodash/fp/isUndefined';
import _omitBy from 'lodash/fp/omitBy';
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
 * Use a default value after deserialization,
 * in cae the value turns up undefined.
 *
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

/**
 * Skip the value after serialization if predicate returns true,
 * in case the BE doesn't want to receive certain values.
 *
 * Some REST API's rather have the key not being there than having a certain
 * value they see as a nil value, like `null`, `""` or `{}`. In that case, this
 * skip schema can be used with a predicate function to check.
 *
 * @function
 * @param {function(*): boolean} predicate
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const skipBy = _curry((predicate, schema) => ({
    serialize: _flow(schema.serialize, value => predicate(value) ? SKIP : value),
    deserialize: schema.deserialize,
}));

/**
 * Skip `null` value after serialization.
 *
 * @see {@link skipBy}
 * @function
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const skipNull = skipBy(_isNil);

/**
 * Omit values after serialization.
 *
 * @see {@link skipBy}
 * @function
 * @param {function(*): boolean} predicate
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const omitBy = _curry((predicate, schema) => ({
    serialize: _flow(schema.serialize, value => _isPlainObject(value) ? _omitBy(predicate, value) : value),
    deserialize: schema.deserialize,
}));

/**
 * Omit `null` values after serialization.
 *
 * @see {@link omitBy}
 * @function
 * @param {PropertySchema} schema
 * @returns {PropertySchema}
 */
export const omitNull = omitBy(_isNull);
