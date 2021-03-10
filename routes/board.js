const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/board', (req,res) => {
	let {title, content, id} = req.body;
	let sql = 'insert into shop_board(title,content,writer,created) values(?,?,?,NOW())';
	var data = [title, content, id]
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		if(rows){
			res.send('1');
		} else {
			res.send('0');
		}
	})
});

router.get('/board_list', (req, res) => {
	let sql = 'select * from shop_board';
	db.query(sql, (err, rows) => {
		if(err) console.log(err);
		res.send(rows);
	});
})

router.post('/board_detail', (req, res) => {
	let {idx} = req.body;
	console.log(idx);
	let sql = 'select * from shop_board where idx = ?'; 
	var data = [idx];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
})

router.post('/boardUpdate', (req, res) => {
	let {idx, title, content} = req.body;
	console.log(idx);
	let sql = 'update shop_board set title = ?,  content = ? where idx = ?'; 
	var data = [title, content, idx];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
})

router.post('/boardDelete', (req, res) => {
	let {idx} = req.body;
	console.log(idx);
	let sql = 'delete from shop_board where idx = ?'; 
	var data = [idx];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send('1');
	});
})


module.exports = router;