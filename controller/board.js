
const pool = require('../database/db');

module.exports = {

	Board : async (req,res) => {
		try{
		let {title, content, id} = req.body;
		let sql = 'insert into shop_board(title,content,writer,created) values(?,?,?,NOW())';
		var data = [title, content, id]
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
				conn.release();

		if(rows){
			res.send('1');
		} else {
			res.send('0');
		}
		} catch (err) {
			console.log(err);
		}
	},

	Board_list : async (req,res) => {
		try{
		let sql = 'select * from shop_board';
		const conn = await pool.getConnection();
		const [rows] = await conn.query(sql);
				conn.release();

		res.send(rows);
		} catch (err) {
			console.log(err);
		}
	},

	Board_detail : async (req,res) => {
		try{
		let {idx} = req.body;
		console.log(idx);
		let sql = 'select * from shop_board where idx = ?'; 
		var data = [idx];
		const conn = await pool.getConnection();
		const [rows] = await conn.query(sql,data);
				conn.release();

		res.send(rows);
		} catch (err) {
			console.log(err);
		}
	},

	BoardUpdate : async (req,res) => {
		try{
		let {idx, title, content} = req.body;
		console.log(idx);
		let sql = 'update shop_board set title = ?,  content = ? where idx = ?'; 
		var data = [title, content, idx];
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
				conn.release();

		res.send(rows);
		} catch (err) {
			console.log(err);
		}
	},

	BoardDelete : async (req,res) => {
		try{
		let {idx} = req.body;
		console.log(idx);
		let sql = 'delete from shop_board where idx = ?'; 
		var data = [idx];
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
				conn.release();

		res.send('1');
		} catch (err) {
			console.log(err);
		}
	},



}