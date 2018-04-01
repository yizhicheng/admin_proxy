/** 项目启动文件*/
/** 项目启动文件 */
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
//站点配置
app.config = require('./app.config');
var ApiServer = require(app.config.apiDir + 'server');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);

app.use('/', express.static(path.join(__dirname,'fed')));
/** 启动API服务 */
ApiServer.start(app);

// 启动服务
http.createServer(app).listen('3213',function(){
  console.log('start port 3001');
});

module.exports = app;
