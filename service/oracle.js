const oracledb = require('oracledb');
let db = {};
let opts = {
    user: 'app',
    password: '123',
    connectString: '39.105.164.71:1521/orcl'
};
db.query = function(sql, fn) {
    oracledb.getConnection(opts, function(err, conn) {
        if (err) {
            console.log('database connect err: ' + err.message);
            return
        }
        // conn.setAutoCommit(true);
        conn.execute(sql, [], function(err, results) {
            if (err) {
                console.log('database query err: ' + err.message);
            } else {
                fn(results);
            }
            doReleass(conn);
        })
    });
}
function doReleass(conn) {
    conn.close(function(err) {
        if (err) {
            console.log('database close err: ' + err.message);
            return
        }
    })
}
module.exports = db;