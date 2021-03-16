
const pool = require('../database/db');

module.exports = {

	basketWrite : async(req,res) => {
		try{
		let {p_idx, id} = req.body;
		let sql = 'insert into shop_basket(p_idx,id) values(?,?)';
		var data = [p_idx, id];
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
				conn.release();

			res.send(rows);
		}catch(err){
			console.log(err);
		}
	},

	Basket_List : async(req,res) => {
		try{
		let {id} = req.body;
		console.log(id);
		let sql = 'select * from shop_product inner join shop_basket on shop_product.p_idx = shop_basket.p_idx where shop_basket.id = ?';
		let data = [id];
		const conn = await pool.getConnection();
		const [rows] = await conn.query(sql,data);
				conn.release();

			res.send(rows);
		}catch(err){
			console.log(err);
		}
	},

}