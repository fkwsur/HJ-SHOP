const paypal = require('paypal-rest-sdk');
const pool = require('../database/db');

paypal.configure({
	'mode' : 'sandbox',
	'client_id' : 'dsljdlksjdlsdas',
	'client_secret' : 'daskjdakljdaslk;jdsaljdsal;k'
})


module.exports = {
	GetURL : async (req, res) => {
		try {
			let { amount } = req.body;

			let pay_req = JSON.stringify({
				"intent" : "sale",
				"payer" : {
					"payment_method" : "paypal"
				},
				"redirect_urls" : {
					"return_url" : "http://localhost:3000/success",
					"cancel_url" : "http://localhost:3000/failed"
				},
				"transactions" : [
					{
							amount : {
								total : `${amount}`,
								currency : 'USD'
							},
							description : 'HJ_SHOP'
					}
				],
			})
			await paypal.payment.create(pay_req, (error, payment) => {
				if (error) console.log(error);
				let links = {};
				payment.links.forEach((linkObj) => {
					links[linkObj.rel] = {
						href : linkObj.href,
						method : linkObj.method
					};
				});
				if( links.hasOwnProperty('approval_url')){
					let link = links['approval_url'].href;
					return res.send(link);
				}else {
					console.log('url_error');
				}
		});
		} catch (error) {
			console.log(error);
		}
	},
	Pay_Ok : async (req, res) => {
		try {
			let { paymentId, payerId, id, p_price, p_name } = req.body;

			paypal.payment.execute(
				paymentId,
				payerId,
				async (error, payment) => {
					if(error) console.log(error);
					if(payment.state === 'approved') res.send('1');
					let sql = 'insert into recipe (p_name, p_price, pg_name, buyer) values(?,?,?,?)';
					var data = [p_name, p_price, 'paypal', id];
					const conn = await pool.getConnection();
					const rows = await conn.query(sql, data);
					if(rows) return res.status(200).json({result : true });
					else throw res.send('failed');
				}
			)
		} catch (error) {
			console.log(error);
		}
	}
}