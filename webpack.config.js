import webpack from 'webpack';
import path from 'path';

const port = process.env.PORT || 3000;

export default {
    debug: true,
    devtool: 'source-map',
    entry: [
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
        './src/entry'
    ],
    output: {
        publicPath: `http://localhost:${port}/dist/`,
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '', '.js' ],
        packageMains: [ 'webpack', 'main' ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'react-hot!babel',
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)$/,
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    target: 'electron-renderer'
};