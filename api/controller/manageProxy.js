/** 反向代理管理控制器*/
var process = require('child_process');
var siteConfig = require('../../app.config');
var proxyServ = require(siteConfig.apiDir + 'services/proxyServ');

module.exports = {
  /** 获得反向代理列表控制器 */
  GetProxyCtrl : function( req, res, next ) {
    proxyServ.getProxyList().then(function( resp ){
      res.jsonp(resp);
    });
  },
  /** 删除代理控制器 */
  DeleteProxyCtrl : function( req, res, next ){
    var id = req.body.id;
    proxyServ.deleteProxy( id ).then(function( resp ){
      var json = {};
      if(resp) {
        json = {'message' : '操作成功!',code: 200, error: 0};
      } else {
        json = {'message' : '操作失败!',code: 400, error: 1};
      }
      res.jsonp(json);
    });
  },
  /** 跟新或增加 */
  ProxyConfigCtrl : function( req, res, next ) {
    var id = req.body.id ? req.body.id : '';
    var domain = req.body.domain ? req.body.domain : '';
    var target_domain = req.body.target_domain ? req.body.target_domain : '';
    proxyServ.proxyConfig( id, domain, target_domain ).then(function( resp ){
      var json = {};
      if( results && results.affectedRows >= 1 ){
        json = {message: '操作成功!', error: 0, code: 200};
        res.jsonp(json);
      } else {
        json = {message: '操作数据库失败!', error: 1, code: 400};
        res.jsonp(json);
      }
    });
  },
  /** 重启服务器 */
  RestartServerCtrl : function ( req, res, next ) {
    process.execFile( siteConfig.apiDir + "shell/restart.sh",[],null, function (error, stdout, stderr) {
        console.log(error, stdout, stderr);
        if ( error !== null ) {
          json = {message: '重启服务失败，请手动重启服务!', error: 1, code: 200};
          res.jsonp(json);
        } else {
          json = {message: '重启服务成功!', error: 0, code: 200};
          res.jsonp(json);
        }
    });
  }
}
