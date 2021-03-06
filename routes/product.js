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

module.exports = router;