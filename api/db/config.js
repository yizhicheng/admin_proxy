var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'db_proxy',
    port: 3306
});
module.exports = pool;
