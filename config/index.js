var path = require('path')
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  build: {
    env: {
      NODE_ENV: "'" + NODE_ENV + "'",
    },
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    env: {
      NODE_ENV: "'" + NODE_ENV + "'",
    },
    port: 8092,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
  }
}