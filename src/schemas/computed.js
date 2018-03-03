import SKIP from '../core/skip';

/**
 * @callback ComputeObjectModel
 * @param {Object} json
 * @param {string} property
 * @param {JSON) value
 * @returns {OBJECT}
 * @template OBJECT, JSON
 */

/**
 * @function
 * @param {ComputeObjectModel<OBJECT, JSON>} compute
 * @returns {PropertySchema<OBJECT, JSON>}
 * @template OBJECT, JSON
 */
export const computed = compute => ({
    serialize: () => SKIP,
    deserialize: (value, json, property) => compute(json, property, value),
});

export default computed;
