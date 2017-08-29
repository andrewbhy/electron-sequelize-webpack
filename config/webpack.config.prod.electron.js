var path = require('path')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/electron/main.js',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: './public/',
        filename: 'main-electron.js'
    },
    target: 'electron-main',
    externals : [nodeExternals()],
    node : {
        __dirname: false,
        __filename : false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    /*resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    },*/
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: process.env.NODE_ENV !== 'production' ? '#eval-source-map' : false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}