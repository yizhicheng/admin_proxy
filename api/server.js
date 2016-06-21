/** ApiServer入口 */
var ApiServer = function(){
  this.version = '1.0.0';
  // 初始化路由配置
  this.initRouter = function() {
    var router = require('express').Router();
    //拦截请求
    router.all('/*', function(req, res, next){
      req.accepts('*/*');
      next();
    });
    this.tranRouterConfig( router );
    return router;
  },
  //遍历配置的路由
  this.tranRouterConfig = function( router ) {
    var routerConfig = require('./app.router.js');
    // 遍历所有配置的路由
    for (var k in routerConfig) {
      if ( routerConfig.hasOwnProperty(k) ) {
        var ctrl = routerConfig[k].controller;
        var ctrls = require('.' + routerConfig[k].controllerUrl);
        ctrls.hasOwnProperty( ctrl ) && router.all(routerConfig[k].url, ctrls[ctrl]);
      }
    }
  }
}
ApiServer.prototype.start = function( app ){
  var route = this.initRouter();
  app.use('/api', route);
}
module.exports = new ApiServer();
