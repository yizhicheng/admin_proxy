var mysql = require('mysql');
var dbConfig = require('./db.config');
var q = require('q');

var pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
});
module.exports = {
  pool : pool,
  /** 数据库操作 */
  query : function( sql ) {
    var dfd = q.defer();
    pool.getConnection(function (err, conn) {
      conn.query( sql, function(err, results) {
        dfd.resolve( results );
      });
      conn.release();
    });
    return dfd.promise;
  }
};
