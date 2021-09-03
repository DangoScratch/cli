const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');

const info = require('./info.json');

const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
        library: {
            type: 'commonjs2'
        },
        libraryExport: 'default'
    },
    externals: {
        'clipcc-extension': 'ClipCCExtension'
    },
    externalsType: 'global',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(__dirname, 'locales'),
                to: path.join(__dirname, 'build/locales'),
            }, {
                from: path.join(__dirname, 'assets'),
                to: path.join(__dirname, 'build/assets'),
            }, {
                from: path.join(__dirname, 'info.json'),
                to: path.join(__dirname, 'build/info.json'),
            }]
        }),
        new ZipWebpackPlugin({
            path: path.join(__dirname, 'dist'),
            filename: `${info.id}@${info.version}`,
            extension: 'ccx'
        })
    ]
};

module.exports = config;