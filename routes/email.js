const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {EMAIL_ID, EMAIL_PASSWORD} = process.env;

const smtpTransport = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : EMAIL_ID,
        pass : EMAIL_PASSWORD,
    },
    tls : {
        rejectUnauthorized : false
    }
});

router.post('/emailAuth', ( req, res ) => {
    let email = req.body.email;
    console.log(email);
    let authCode = Math.random().toString().substr(2, 6);
        
    const mailOptions = {
        from: EMAIL_ID,
        to: email,
        subject: 'HJ_SHOP 인증메일 입니다.',
        text: `인증 번호 ${authCode} 를 입력해주세요.`,
    };
    smtpTransport.sendMail(mailOptions, (err, res) => {
        if (err) console.log(`mail${err}`);
        smtpTransport.close();
        res.send('err');
    });
    res.send(authCode);
});

module.exports = router;
