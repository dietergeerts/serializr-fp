export {alias} from './alias';
export {array} from './array';
export {computed} from './computed';
export {DATE} from './date';
export {DATE_ONLY} from './date-only';
export {object} from './object';
export {omitBy} from './omit-by';
export {omitNull} from './omit-null';
export {optional} from './optional';
export {PRIMITIVE} from './primitive';
export {skipBy} from './skip-by';
export {skipNull} from './skip-null';
export {withDefault} from './with-default';
export {withJsonDefault} from './with-json-default';

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
