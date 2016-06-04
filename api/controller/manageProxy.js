var pool = require('../db/config');
module.exports = {
  /** 获得反向代理列表控制器 */
  GetProxyCtrl : function( req, res, next ) {
    pool.getConnection(function (err, conn) {
      conn.query('select * from tb_config', function(err, results) {
        res.jsonp(results);
      });
    });
  },
  /** 删除代理控制器 */
  DeleteProxyCtrl : function( req, res, next ){
    var id = req.body.id;
    pool.getConnection(function (err, conn) {
      conn.query('delete from tb_config where id=' + id, function(err, results) {
        var json = {};
        if(results) {
          json = {'message' : '操作成功!',code: 200, error: 0};
        } else {
          json = {'message' : '操作失败!',code: 400, error: 1};
        }
        res.jsonp(json);
      });
    });
  },
  /** 跟新或增加 */
  ProxyConfigCtrl : function( req, res, next ) {
    var id = req.body.id ? req.body.id : '';
    var domain = req.body.domain ? req.body.domain : '';
    var target_domain = req.body.target_domain ? req.body.target_domain : '';
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
    pool.getConnection(function (err, conn) {
      conn.query(sql, function(err, results) {
        var json = {};
        if( results.affectedRows >= 1 ){
          var command = require('../command');
          command.exec('ls -l', function ( resp ) {
            console.log( resp );
          })
          json = {message: '操作成功!', error: 0, code: 200};
        } else {
          json = {message: '失败', error: 1, code: 400};
        }
        res.jsonp(json);
      });
    });
  }
}
