import demand from 'must';
import _forOwn from 'lodash/fp/forOwn';
import {deserialize, serialize} from "../src/index";

const _forOwnWithKey = _forOwn.convert({cap: false});

/**
 * @typedef {Object.<string, ModelSchemaTestCase>} ModelSchemaTestCases
 */

/**
 * @typedef {Object} ModelSchemaTestCase
 * @property {!Object} json
 * @property {!Object} object
 */

/**
 * @private
 * @param {!function(!Object|Object[]): !Object|Object[]} transform
 * @param {!ModelSchemaTestCases} testCases
 * @param {!string} given
 * @param {!string} expect
 * @returns {function(): void}
 */
function demandAll(transform, testCases, given, expect) {

    return () => _forOwnWithKey(
        (testCase, test) => {
            demand(transform(testCase[given]), test)
                .to.eql(testCase[expect]);
        }, testCases);
}

/**
 * @param {!string} name
 * @param {!ModelSchema} schema
 * @param {!ModelSchemaTestCases} serializeTestCases
 * @param {!ModelSchemaTestCases} deserializeTestCases
 */
export function describeModelSchema(name, schema, serializeTestCases, deserializeTestCases) {

    describe(name, () => {
        it(`must serialize`, demandAll(serialize(schema), serializeTestCases, 'object', 'json'));
        it(`must deserialize`, demandAll(deserialize(schema), deserializeTestCases, 'json', 'object'));
    });
}
