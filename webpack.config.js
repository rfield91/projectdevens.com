const path = require('path');

const mode =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';

console.log(mode);

module.exports = {
    mode: mode,
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.png/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    devServer: {
        host: '0.0.0.0',
        static: {
            directory: path.resolve(__dirname, './build'),
        },
    },
    watchOptions: {
        poll: true,
    },
    devtool: 'source-map',
};
