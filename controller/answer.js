
const pool = require('../database/db');

module.exports = {

	QnaAnswer : async (req, res) => {
		try{
			let {id, title, content} = req.body;
			let sql = 'insert into shop_answer(id,title,content,answered,sending_date) values(?,?,?,?,NOW())';
			var data = [id, title, content, 'yes'];
			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();

				res.send(rows);
		} catch(err) {
			throw console.log(error)
		}
	},

	QnaAnswerList : async (req, res) => {
		try{
			let sql = 'select * from shop_answer where answered = ?';
			var data = ['yes'];
			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			throw console.log(error)
		}
	}

}