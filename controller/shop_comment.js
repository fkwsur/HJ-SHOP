const pool = require('../database/db');

module.exports = {

	Comments : async (req,res) => {
		try{
			let {comment, id, idx} = req.body;
			let sql = 'insert into shop_comment(content,writer,b_idx) values(?,?,?)'
			var data = [comment, id, idx]

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
				conn.release();

			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Comment_list : async (req,res) => {
		try{
			let { value } = req.query;
			let sql = 'select * from shop_comment where b_idx = ?;'
			var data = [value];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
				conn.release();

			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

}