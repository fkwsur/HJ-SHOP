const express = require('express');
const db = require('../database/db');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest : './uploads'});


router.post('/product_add_item', upload.fields([{name : 'image'},{name : 'detailImage'}]), (req,res) => {
	let {title, price, select, content} = req.body;
	let image = '/img/' + req.files.image[0].filename;
	let detailImage = '/img/' + req.files.detailImage[0].filename;
	let sql = 'insert into shop_product(p_name,p_price,category,p_content,p_img,p_img2,main,deleted) values(?,?,?,?,?,?,?,?)';
	var data = [title, price, select, content, image, detailImage, 'no', 'no']
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		if(rows){
			res.send('1');
		} else {
			res.send('0');
		}
	})
});

router.get('/product_list', (req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	let sql = 'select * from shop_product where deleted = ?';
	var data = ['no'];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		res.send(rows);
	});
})

router.get('/product_delete_list', (req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	let sql = 'select * from shop_product where deleted = ?';
	var data = ['yes'];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		res.send(rows);
	});
})



router.post('/product_detail_list', (req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	let sql = 'select * from shop_product where p_idx = ? and deleted = ?'; 
	var data = [p_idx, 'no'];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
})

router.post('/AdminUpdate', upload.fields([{name : 'image'},{name : 'detailImage'}]), (req,res) => {

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
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		if(rows){
			res.send('1');
		} else {
			res.send('0');
		}
	})
});

router.post('/AdminDelete', (req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	let sql = 'update shop_product set deleted = ? where p_idx = ?'; 
	var data = ['yes', p_idx];
	db.query(sql,data, (err, rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send('1');
	});
})

router.get('/main',(req, res) => {
	let sql = 'select * from shop_product where main = ?';
	var data = ['yes'];
	db.query(sql,data, (err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
}); 

router.post('/main_yes',(req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	console.log('값');
	let sql = 'update shop_product set main = ? where p_idx = ?';
	var data = ['yes', p_idx];
	db.query(sql,data, (err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
}); 

router.post('/main_no',(req, res) => {
	let {p_idx} = req.body;
	console.log(p_idx);
	console.log('값');
	let sql = 'update shop_product set main = ? where p_idx = ?';
	var data = ['no', p_idx];
	db.query(sql,data, (err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
}); 


router.get('/main_count', (req, res) => {
	let sql = 'select count(*) AS count from shop_product where main = "yes"';
	db.query(sql, (err,rows) => {
		if(err) console.log(err);
		console.log(rows);
		res.send(rows);
	});
})

router.get('/category', (req, res) => {
	console.log('1');
	let { value } = req.query;
	// req.get, headers, body, params, query
	console.log(value);
	let sql = 'select * from shop_product where category = ? and deleted = ?';
	var data = [value, 'no'];
	db.query(sql,data, (err,rows) => {
		console.log(rows);
		if(err) console.log(err);
		res.send(rows);
	});
})

module.exports = router;