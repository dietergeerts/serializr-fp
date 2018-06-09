/**
 * @type {ModelSchema<Date, string>}
 */
export const DATE = {
  serialize: value => value && value.toJSON(),
  deserialize: value => value && new Date(value),
};

export default DATE;
