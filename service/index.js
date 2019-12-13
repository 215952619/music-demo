const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./oracle.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('hello express');
})

app.get('/login', function(req, res) {
    let sql = `select * from ly_music_user where name = '${req.query.name}' and pwd = '${req.query.pwd}'`;
    db.query(sql, function(results) {
        res.json({code: 'ok', data: results, rows: results.rows.length})
    })
})

app.post('/regist', function(req, res) {
    let str = `select * from ly_music_user where name = '${req.body.params.name}'`;
    console.log(str)
    db.query(str, function(result) {
        if (result.rows.length > 0) {
            res.json({code: 'warn', data:{msg: '该用户已经存在'}});
        } else {
            let str = `insert into ly_music_user(name,pwd,age,sex,tel,qq)
             values('${req.body.params.name}','${req.body.params.pwd}',${req.body.params.age},
             '${req.body.params.sex}','${req.body.params.tel}','${req.body.params.qq}')`;
             console.log(str)
            db.query(str, function(results) {
                res.json({code: 'ok', data: results})
            })
        }
    })
})

app.listen(3000, function() {
    console.log('app listening on port 3000');
})