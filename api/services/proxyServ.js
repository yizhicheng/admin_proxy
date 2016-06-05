/** 服务层 读写数据库操作均再次完成 */
var pool = require('../db/pool');
var q = require('q');

var proxyServ = function(){
  this.service = 'proxyServ';
};

// 获得列表
proxyServ.prototype.getProxyList = function(){
  var sql = 'select * from tb_config';
  return pool.query(sql);
};
// 删除反向代理
proxyServ.prototype.deleteProxy = function( id ){
  var sql = 'delete from tb_config where id=' + id;
  return pool.query(sql);
};
// 增加，跟新反向代理
proxyServ.prototype.proxyConfig = function( id, domain, target_domain ) {
  var sql = id ? 'update tb_config set' : 'insert into tb_config set';
  if( domain ) {
    sql +=' domain="' + domain + '"';
  }
  if( target_domain ) {
    sql += ' ,target_domain="' + target_domain + '"';
  }
  if( id ) {
    sql += ' where id=' + id;
  }
  return pool.query(sql);
}
module.exports = new proxyServ();
