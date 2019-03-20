const mysql = require('mysql');
const db = {};
const opts = {
    host: '39.105.164.71',
    user: 'root',
    password: '',
    database: '20161011',
    port: 3306
};

db.query = function sqlback(sql, fn) {
    let conn = mysql.createConnection(opts);
    conn.connect(function(err) {
        if (err) {
            console.log('database connect err: ' + err);
            return
        }
    });
    conn.query(sql, function(err, results, fields) {
        if (err) {
            console.log('database query err: ' + err);
            conn.end(function(err) {
                if (err) {
                    console.log('database close err: ' + err);
                    doReleass(conn);
                    return
                }
            })
            return
        }
        fn(results);
    })
    doReleass(conn);
}

function doReleass(conn) {
    conn.end(function(err) {
        if (err) {
            console.log('database close err: ' + err);
            return
        }
    })
}

module.exports = db;