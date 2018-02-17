const babel = require('babel-core');

module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'src/**/*.js'},
            {pattern: 'src/**/*.test.js', ignore: true},
            {pattern: 'test/**/*.js'},
        ],
        tests: [
            {pattern: 'src/**/*.test.js'},
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel({babel: babel}),
        },
        testFramework: 'mocha',
        env: {
            type: 'node',
        },
    };
};
