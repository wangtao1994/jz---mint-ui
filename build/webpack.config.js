const path              = require('path')
const webpack           = require('webpack')
const config            = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var projectRoot = path.resolve(__dirname, '../')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: resolve( '/src/main.js'),
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV.indexOf('production') > 0
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
            name: '[name].[ext]?[hash]'
        }
      },
      
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve( '/src'),
      },
/*      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },*/
      //以上5个loader配置都是为element-ui进行配置
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      //svg loader的配置
      /*{
        test: /\.svg$/,
        loader: 'svg-sprite?' + JSON.stringify({
          name: '[name]_[hash]',
          prefixize: true
        })
      },*/
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve( '/src'),
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  //将生成的打包文件注入到html中
/*  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
      inject: true
    }),
    new ExtractTextPlugin('styles.css')
  ]*/
}
