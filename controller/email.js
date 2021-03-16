const nodemailer = require('nodemailer');
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


module.exports = {
	EmailAuth : async (req, res) => {
		try {
			let { email } = req.body;
			let authCode = Math.random().toString().substr(2,6);
			const mailOptions = {
        from: EMAIL_ID,
        to: email,
        subject: 'HJ_SHOP 인증메일 입니다.',
        text: `인증 번호 ${authCode} 를 입력해주세요.`,
    };
    await smtpTransport.sendMail(mailOptions, (err, res) => {
        if (err) console.log(`mail${err}`);
        smtpTransport.close();
        res.send('err');
    });
    res.send(authCode);
		} catch (error) {
				console.log(error);
		}
	}
}