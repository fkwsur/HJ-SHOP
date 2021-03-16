const pool = require('../database/db');
const bcrypt = require('bcryptjs');

module.exports = {
	Signup : async (req, res) => {
		try{
			let {id, password, email} = req.body;
			let salt = bcrypt.genSaltSync(8);
			let hashpassword = bcrypt.hashSync(password, salt);
			let sql = 'insert into shop_member(id,password,email) values(?,?,?)';
			var data = [id, hashpassword, email];
			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch (err) {
			throw console.log(err);
		}
	},

	Confirm : async (req, res) => {
		try {
		let {id} = req.body;
		let sql = 'select * from shop_member where id = ?';
		var data = [id];
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
		conn.release();
		res.send(rows);
		} catch (error) {
			throw console.log(error);
		}
	},

	Login : async (req, res) => {
		try{
			let {id, password} = req.body;
			console.log(req.body);
			let sql = 'select * from shop_member where id = ?'
			var data = [id];
			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			console.log(rows[0]);
			conn.release();
			let check = bcrypt.compareSync(password, rows[0].password);
			if(check){
				res.send('1');
			}else{
				res.send('0');
			}
		} catch (err) {
			throw console.log(err);
		}
	},
}