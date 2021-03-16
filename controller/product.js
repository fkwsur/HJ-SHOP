
const pool = require('../database/db');
const multer = require('multer');
const upload = multer({dest : './uploads'});

module.exports = {

	Product_add_item : async(req,res) => {
		try{
			let {title, price, select, content} = req.body;
			let image = '/img/' + req.files.image[0].filename;
			let detailImage = '/img/' + req.files.detailImage[0].filename;
			let sql = 'insert into shop_product(p_name,p_price,category,p_content,p_img,p_img2,main,deleted) values(?,?,?,?,?,?,?,?)';
			var data = [title, price, select, content, image, detailImage, 'no', 'no']

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();
			if(rows){
				res.send('1');
			} else {
				res.send('0');
			}
		} catch(err) {
			console.log(err);
		}
	},

	Product_list : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			let sql = 'select * from shop_product where deleted = ?';
			var data = ['no'];
			console.log('2');
			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			console.log(rows);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Product_delete_list : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			let sql = 'select * from shop_product where deleted = ?';
			var data = ['yes'];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Product_detail_list : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			let sql = 'select * from shop_product where p_idx = ? and deleted = ?'; 
			var data = [p_idx, 'no'];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	AdminUpdate : async(req,res) => {
		try{
			const obj = JSON.parse(JSON.stringify(req.files));
			console.log(obj.image, obj.detailImage);
			console.log(obj);
				var image;
				var detailImage;
		
			if(!obj.image && obj.detailImage){
				console.log('1')
				image = req.body.image;
				detailImage = '/img/' + req.files.detailImage[0].filename;
			}else if(obj.image && !obj.detailImage){
				console.log('11')
				image = '/img/' + req.files.image[0].filename;
				detailImage = req.body.detailImage;
			} else if(obj.image && obj.detailImage){
				console.log('111')
				image = '/img/' + req.files.image[0].filename;
				detailImage = '/img/' + req.files.detailImage[0].filename;
			} else {
				console.log('1111')
				image = req.body.image;
				detailImage = req.body.image;
			 }
			
			let {p_idx, title, price, select, content} = req.body;
			let sql = 'update shop_product set p_name = ?, p_price = ?, category = ?, p_content = ?, p_img = ?, p_img2 = ?, main = ?, deleted = ? where p_idx = ?';
			var data = [title, price, select, content, image, detailImage, 'no', 'no', p_idx]

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();
			if(rows){
				res.send('1');
			} else {
				res.send('0');
			}
		} catch(err) {
			console.log(err);
		}
	},

	AdminDelete : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			let sql = 'update shop_product set deleted = ? where p_idx = ?'; 
			var data = ['yes', p_idx];

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Main : async(req,res) => {
		try{
			let sql = 'select * from shop_product where main = ?';
			var data = ['yes'];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Main_yes : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			console.log('값');
			let sql = 'update shop_product set main = ? where p_idx = ?';
			var data = ['yes', p_idx];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Main_no : async(req,res) => {
		try{
			let {p_idx} = req.body;
			console.log(p_idx);
			console.log('값');
			let sql = 'update shop_product set main = ? where p_idx = ?';
			var data = ['no', p_idx];

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();;
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Main_count : async(req,res) => {
		try{
			let sql = 'select count(*) AS count from shop_product where main = "yes"';

			const conn = await pool.getConnection();
			const rows = await conn.query(sql);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Category : async(req,res) => {
		try{
			let { value } = req.query;
			// req.get, headers, body, params, query
			console.log(value);
			let sql = 'select * from shop_product where category = ? and deleted = ?';
			var data = [value, 'no'];

			const conn = await pool.getConnection();
			const [rows] = await conn.query(sql,data);
			console.log(rows);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

	Search : async(req,res) => {
		try{
			let {result} = req.query;
			console.log(result);
			let sql = 'select * from shop_product where p_name like "%"?"%"';
			console.log(sql);
			var data = [result]

			const conn = await pool.getConnection();
			const rows = await conn.query(sql,data);
			conn.release();
			res.send(rows);
		} catch(err) {
			console.log(err);
		}
	},

}