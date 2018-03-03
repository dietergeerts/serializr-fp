/**
 * @type {ModelSchema<TYPE, TYPE>}
 * @template TYPE
 */
export const PRIMITIVE = {
    serialize: value => value,
    deserialize: value => value,
};

export default PRIMITIVE;
