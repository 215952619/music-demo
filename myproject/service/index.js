const express = require('express');
const app = express();
const db = require('./oracle.js');

app.get('/', function(req, res) {
    res.send('hello express');
})

app.get('/login', function(req, res) {
    // let sql = `select * from ly_music_user where name = '` + req.query.name + `' and pwd = '` + req.query.pwd + `'`;
    let sql = `select * from ly_music_user where name = '${req.query.name}' and pwd = '${req.query.pwd}'`;
    db.query(sql, function(results) {
        res.json({data: results})
    })
})

app.listen(3000, function() {
    console.log('app listening on port 3000');
})