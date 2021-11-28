// vue.config.js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const isLib = process.env.TYPE === 'lib';

module.exports = {
    chainWebpack(config) {
        if (!isLib) {
            config.plugin('monaco').use(new MonacoWebpackPlugin()); // fix：https://blog.csdn.net/m0_45236510/article/details/115049181
        }
        config.plugin('circular').use(
            new CircularDependencyPlugin({
                exclude: /node_modules/,
            })
        );
    },
    css: {
        requireModuleExtension: true,
    },
};
