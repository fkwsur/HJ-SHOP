
const pool = require('../database/db');

module.exports = {

	Qna : async (req,res) => {
		try{
			let {id, title, content} = req.body;
			let sql = 'insert into shop_ask(id,title,content,sending_date) values(?,?,?,NOW())';
			var data = [id, title, content];
			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
				conn.release();

				res.send(rows);
		} catch (err){
			console.log(err);
		}
	},

	AdminQna : async (req,res) => {
		try{
			let sql = 'select * from shop_ask;';
			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql);
				conn.release();

				res.send(rows);
		} catch (err){
			console.log(err);
		}
	},

	QnaId_Post : async (req,res) => {
		try{
			let { id } = req.body;
			console.log(id);
			let sql = 'select * from shop_ask where id = ?';
			var data = [id];
			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
				conn.release();

				res.send(rows);
		} catch (err){
			console.log(err);
		}
	},

}