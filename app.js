const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression')
const helmet = require('helmet');


const Router = require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/img', express.static('./uploads'));
app.use(compression());
app.use(helmet());

app.use('/api/member', Router.memberRouter);
app.use('/api/email', Router.emailRouter);
app.use('/api/product', Router.productRouter);
app.use('/api/ask', Router.askRouter);
app.use('/api/answer', Router.answerRouter);
app.use('/api/board', Router.boardRouter);
app.use('/api/basket', Router.basketRouter);
app.use('/api/favorites', Router.favorRouter);
app.use('/api/shop_comment', Router.CommentRouter);
app.use('/api/paypal', Router.paypalRouter);
// app.use('/api/buy_comment', buy_comment);


app.listen(8080, () => {
    let cpu = require('os').cpus().length;
    console.log(cpu);
    console.log('server on');
    /*
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
    */
});