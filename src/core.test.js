import {describeModelSchema} from "../test";
import {optional, PRIMITIVE} from "./schemas";

describe('SKIP', () => {

    it(`must be defined as a symbol, for usage of skipping properties.`);
});

describe('serialize', () => {

    it(`must serialize`);
});

describe('deserialize', () => {

    it(`must deserialize`);
});

describeModelSchema('OPTIONAL_REQUIRED_TEST_SCHEMA', {
    primitive: PRIMITIVE,
    optional: optional(PRIMITIVE),
}, {
    testCase1: {
        object: {},
        json: {primitive: null},
    },
    testCase2: {
        object: {primitive: undefined, optional: undefined},
        json: {primitive: null},
    },
}, {
    testCase1: {
        json: {},
        object: {primitive: null},
    },
});
