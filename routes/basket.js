const express = require('express');
const db = require('../database/db');
const router = express.Router();

router.post('/',(req, res) => {
	let {p_idx, id} = req.body;
	let sql = 'insert into shop_basket(p_idx,id) values(?,?)';
	var data = [p_idx, id];
	db.query(sql,data,(err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	})
}); 

module.exports = router;