const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/qna',(req, res) => {
	let {id, title, content} = req.body;
	let sql = 'insert into shop_ask(id,title,content,sending_date) values(?,?,?,NOW())';
	var data = [id, title, content];
	db.query(sql,data,(err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	})
}); 

router.get('/AdminQna',(req, res) => {
	let sql = 'select * from shop_ask;';
	db.query(sql,(err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	})
}); 

router.post('/qnaId_post',(req, res) => {
	let { id } = req.body;
	console.log(id);
	let sql = 'select * from shop_ask where id = ?';
	var data = [id];
	db.query(sql,data,(err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	})
}); 

module.exports = router;