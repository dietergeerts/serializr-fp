/**
 * @typedef {Object} ModelSchema
 * @property {ModelTransformer<OBJECT, JSON>} serialize
 * @property {ModelTransformer<JSON, OBJECT>} deserialize
 * @template OBJECT, JSON
 */

/**
 * @callback ModelTransformer
 * @param {SOURCE} value
 * @returns {TARGET}
 * @template SOURCE, TARGET
 */

/**
 * @type {ModelSchema<TYPE, TYPE>}
 * @template TYPE
 */
export const PRIMITIVE = {
  serialize: value => value,
  deserialize: value => value,
};

export default PRIMITIVE;
