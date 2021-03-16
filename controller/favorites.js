
const pool = require('../database/db');

module.exports = {

	FavoritesWrite : async (req, res) => {
		try{
		let {p_idx, id} = req.body;
		console.log('1');
		let sql = 'insert into shop_favorites(p_idx,id) values(?,?)';
		var data = [p_idx, id];
		const conn = await pool.getConnection();
		const rows = await conn.query(sql,data);
				conn.release();

		res.send(rows);
		} catch(err){
			throw console.log(err)
		}
	},

	Favorites_list : async (req, res) => {
		try{
		let {id} = req.body;
		console.log(id);
		let sql = 'select * from shop_product inner join shop_favorites on shop_product.p_idx = shop_favorites.p_idx where shop_favorites.id = ?';
		let data = [id];
		const conn = await pool.getConnection();
		const [rows] = await conn.query(sql,data);
				conn.release();

		res.send(rows);
		} catch(err){
			throw console.log(err)
		}
	},


}