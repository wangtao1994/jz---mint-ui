//开发时使webpack dev server 能获取(更新)到打包好的bundle js的中间件
const webpackDevMiddleware = require('webpack-dev-middleware')
//热替换
const webpackHotMiddleware = require('webpack-hot-middleware')

var config = require('../config')
if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
/*var proxyMiddleware = require('http-proxy-middleware') //跨域代理*/
var webpackConfig = require('./webpack.dev.config')

var port = process.env.PORT || config.dev.port

var autoOpenBrowser = !!config.dev.autoOpenBrowser

var app = express()

var apiRoutes = require('../api/apiroutes.js')

app.use('/api', apiRoutes)


var compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler))

app.use(webpackHotMiddleware(compiler))

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

/*app.use(staticPath, express.static('./static'))*/
//将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了
app.use(express.static(path.join(__dirname, '..', 'index.html')))
app.use(express.static(path.join(__dirname, '..', 'static')))
//app.use(express.static(path.join(__dirname, '..', config.projectRoot + '/src/images')))

/*app.get('*', function (request, response){
  response.sendFile(path.join(__dirname, '..', 'index.html'))
})*/

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})