var mysql      = require('mysql');
var express = require('express');
var router = express.Router();
var controller = require('../controller/manageProxy');

//获得列表
router.get('/getproxy', controller.GetProxyCtrl);
//删除
router.post('/deleteproxy', controller.DeleteProxyCtrl);
//更新,或插入
router.post('/proxyconfig', controller.ProxyConfigCtrl);

module.exports = router;
