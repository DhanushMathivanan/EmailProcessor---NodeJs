const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    target: 'node',
    context: __dirname,
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'twinkle-api.js',
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'package.json' },
            { from: './src/config/*.json', to: 'config', flatten: true }
        ])
    ],
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }

        ],
    },
};