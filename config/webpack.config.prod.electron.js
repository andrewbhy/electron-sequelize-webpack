var path = require('path')
var webpack = require('webpack')
var ExternalsPlugin = require('webpack2-externals-plugin');



let output_dev = {
    path: path.resolve(__dirname, '../build'),
    publicPath: './public/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
}

let output_prod = {
    path: path.resolve(__dirname, '../build'),
    publicPath: './public/',
    filename: 'main-electron.js',
    sourceMapFilename: 'main-electron.js.map'
}



module.exports = {
    entry: './src/electron/main.js',

    output: output_dev,// process.env.NODE_ENV =='development' ? output_dev : output_prod,
    target: 'electron-main',

    //doesn't ignore tedious
    //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externals:  {
        'pg' : true,
        'pg-hstore' :true,
        'sqlite3' : true,
        'mysql2' : true
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        noParse : [ /node_modules/ ],
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
            },
            //allow binary files 
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    /*resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    },*/

    resolve: {
        modules: ["node_modules", "mocks"]
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: process.env.NODE_ENV !== 'production' ? '#eval-source-map' : false,
    plugins: [
        //this works as intended, but no modules are loaded anymore..
        // new ExternalsPlugin({
        
        //     include: /node_modules/,
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false
        })
    ]
}