var path = require('path')
var paths = require('./paths')
var webpack = require('webpack')
var ExternalsPlugin = require('webpack2-externals-plugin');
var FlowtypePlugin = require('flowtype-loader/plugin');
var env = require('./env/development.json')



// to-do : these output are not working as intended. Need to fix them

let output = {
    path: path.resolve(__dirname, '../build'),
    publicPath: './public/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
}




module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/electron/main.js')
        //,IPCServer : path.resolve(__dirname, '../src/electron/IPCServer/index.js')
    },

    output: output,
    target: 'electron-main',

    //doesn't ignore tedious
    //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externals: {
        'pg': true,
        'pg-hstore': true,
        'sqlite3': true,
        'mysql2': true,
        "sequelize" : "require('sequelize')",
        "electron-ipc-server" : "require('electron-ipc-server')"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        noParse: [/node_modules/],

        rules: [

            // {
                
                            
                                
            //                     test: /\.js$/, 
            //                     //test: /src\/electron\/.*\.js$/,
            //                     exclude: /node_modules/,
            //                     loader: "flowtype-loader"
                            
                          
                
            // },     
            {
                //trying to load all the sub directory under electron folder
       
                test : /\.jsx$/,
                loader: 'babel-loader',
                include : paths.electronSrc,
                exclude:  /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            //unsure if this is needed any longer
            // {
            //     test: /\.node$/,
            //     use: 'node-loader'
            // }
        ]
    },
    /*resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    },*/

    resolve: {
        // alias : {
        //     root : path.resolve(__dirname,"..","src","electron"),
        //     TestModule : path.resolve(__dirname,"..","src","electron","TestModule")
        // },
        modules: [
            //path.resolve(__dirname, '../src/electron'),
            "node_modules",
            paths.appNodeModules
        ]
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
        new FlowtypePlugin(),
        new webpack.DefinePlugin({
            'process.env': Object.assign({}, {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }, env)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false
        })
    ]
}