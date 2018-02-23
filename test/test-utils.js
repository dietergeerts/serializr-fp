import demand from 'must';
import _forOwn from 'lodash/fp/forOwn';
import {deserialize, serialize} from "../src/index";

const _forOwnWithKey = _forOwn.convert({cap: false});

/**
 * @typedef {Object} ModelSchemaTestCases
 * @property {!ModelSchemaTransformTestCases} serialize
 * @property {!ModelSchemaTransformTestCases} deserialize
 */

/**
 * @typedef {Object.<string, !ModelSchemaTestCase>} ModelSchemaTransformTestCases
 */

/**
 * @typedef {Object} ModelSchemaTestCase
 * @property {!Object} json
 * @property {!Object} object
 */

/**
 * @private
 * @param {!function(!Object|Object[]): !Object|Object[]} transform
 * @param {!ModelSchemaTransformTestCases} testCases
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
 * @param {!ModelSchemaTestCases} testCases
 */
export function describeModelSchema(name, schema, testCases) {

    describe(name, () => {
        it(`must serialize`, demandAll(serialize(schema), testCases.serialize, 'object', 'json'));
        it(`must deserialize`, demandAll(deserialize(schema), testCases.deserialize, 'json', 'object'));
    });
}
