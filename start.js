/** 项目启动文件 */
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var routes = require('./api/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);

app.use('/', express.static(path.join(__dirname,'fed')));

routes(app);

// 启动服务
http.createServer(app).listen('3000',function(){
  console.log('start port 3000');
});

module.exports = app;
