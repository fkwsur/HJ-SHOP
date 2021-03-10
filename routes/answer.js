const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/qnaAnswer',(req, res) => {
	let {id, title, content} = req.body;
	let sql = 'insert into shop_answer(id,title,content,answered,sending_date) values(?,?,?,?,NOW())';
	var data = [id, title, content, 'yes'];
	db.query(sql,data,(err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	})
}); 

router.post('/qnaAnswerList',(req, res) => {
	// let {idx} = req.body;
	let sql = 'select * from shop_answer where answered = ?';
	var data = ['yes'];
	db.query(sql,data, (err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
}); 

module.exports = router;