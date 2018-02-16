const path = require('path');
const webpack = require('webpack');
const _flow = require('lodash/fp/flow');
const _omit = require('lodash/fp/omit');
const config = _flow(require('rc'), _omit(['_', 'config', 'configs']));

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'serializr-fp.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'serializr',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: config('babel'),
            },
        ],
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
};
