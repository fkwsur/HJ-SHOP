const express = require('express');
const db = require('../database/db');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/signup',(req, res) => {
    let {id, password, email} = req.body;
    let salt = bcrypt.genSaltSync(8);
    let hashpassword = bcrypt.hashSync(password, salt);
    let sql = 'insert into shop_member(id,password,email) values(?,?,?)';
    var data = [id, hashpassword, email];
    db.query(sql,data,(err,rows) => {
        if(err) console.log(err);
        if(!rows) throw res.send('실패!');
        res.send('1');
    });
}); 

router.post('/confirm',(req, res) => {
    let {id} = req.body;
    let sql = 'select * from shop_member where id = ?';
    var data = [id];
    db.query(sql,data,(err,rows) => {
        if(rows.length > 0) return res.send('아이디 중복');
        res.send('1');
    }); 
});


router.post('/login', (req,res) => {
    let {id, password} = req.body;
    console.log(req.body);
    let sql = 'select * from shop_member where id = ?'
    var data = [id];
    console.log(data);
    db.query(sql,data,(err,rows) => {
        if(err) console.log(err);
        console.log(sql);
        console.log(rows);
        console.log(rows[0].password);
        let check = bcrypt.compareSync(password, rows[0].password);
        console.log('1');
        if(check){
            res.send('1');
        }else{
            res.send('0');
        }
    })
});

module.exports = router;