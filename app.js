const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const member = require('./routes/member');
const email = require('./routes/email');
const product = require('./routes/product');
const buy_comment = require('./routes/buy_comment');
const favorites = require('./routes/favorites');
const basket = require('./routes/basket');
const ask = require('./routes/ask');
const answer = require('./routes/answer');
const board = require('./routes/board');
const shop_comment = require('./routes/shop_comment');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/img', express.static('./uploads'));

app.use('/api/member', member);
app.use('/api/email', email);
app.use('/api/product', product);

/*
app.use('/api/buy_comment', buy_comment);
app.use('/api/favorites', favorites);
app.use('/api/basket', basket);
app.use('/api/ask', ask);
app.use('/api/answer', answer);
app.use('/api/board', board);
app.use('/api/shop_comment', shop_comment);
*/
app.listen(8080, () => {
    console.log('server on');
    let sql = 'select * from shop_member where id = "admin"'
    db.query(sql,(err,rows) => {
        if(err) console.log(err);
        if(rows.length !== 0) return console.log('아이디가 존재합니다.');
        let salt = bcrypt.genSaltSync(8);
        let hashpassword = bcrypt.hashSync("111", salt);
        let sql2 = 'insert into shop_member(id,password, email) values(?,?,?)'
        var data2 = ["admin", hashpassword, "admin@admin.com"];
        db.query(sql2,data2,(err,rows) => {
            if(err) console.log(err);
        });
    });
});