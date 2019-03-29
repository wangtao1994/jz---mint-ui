const path              = require('path')
const config            = require('../config')
const webpack           = require('webpack')
const merge             = require('webpack-merge')
const utils             = require('./utils')
const baseWebpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// add hot-reload related code to entry chunks
/*Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})*/

module.exports = merge(baseWebpackConfig, {
/*  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },*/
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //将生成的打包文件注入到html中
    new HtmlWebpackPlugin({
      dev: true,
      filename: 'index.html', //输出文件，filename的位置是相对于webpackConfig.output.path
      template: resolve( '/src/index.html'),
      inject: true
    })/*,
    new ExtractTextPlugin('styles.css')*/
  ]
})
