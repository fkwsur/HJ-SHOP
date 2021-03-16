const router = require('express').Router();
const {productController : controller} = require('../controller');
const multer = require('multer');
const upload = multer({dest : './uploads'});


router.post('/product_add_item', upload.fields([{name : 'image'},{name : 'detailImage'}]), controller.Product_add_item);

router.get('/product_list', controller.Product_list);

router.get('/product_delete_list', controller.Product_delete_list)

router.post('/product_detail_list', controller.Product_detail_list)

router.post('/AdminUpdate', upload.fields([{name : 'image'},{name : 'detailImage'}]), controller.AdminUpdate);

router.post('/AdminDelete', controller.AdminDelete);

router.get('/main', controller.Main); 

router.post('/main_yes', controller.Main_yes); 

router.post('/main_no', controller.Main_no); 


router.get('/main_count', controller.Main_count)

router.get('/category', controller.Category)

router.get('/search', controller.Search)

// import = () => {
// 	const IMP = window.IMP;
// 	IMP.init('imp89257980');
// 	IMP.request_pay(
// 		{
// 			pg: 'html5_inicis',
// 			pay_method: 'card',
// 			merchant_uid: 'merchant_' + new Date().getTime(),
// 			name: '주문명:결제테스트',
// 			amount: this.state.price,
// 			buyer_tel: '010-1234-5678',
// 		},
// 		function (rsp) {
// 			if (rsp.success) {
// 				var msg = '결제가 완료되었습니다.';
// 				msg += '고유ID : ' + rsp.imp_uid;
// 				msg += '상점 거래ID : ' + rsp.merchant_uid;
// 				msg += '결제 금액 : ' + rsp.paid_amount;
// 				msg += '카드 승인번호 : ' + rsp.apply_num;

// 				axios.post('http://localhost:8081/api/payment/iamport', {
// 					imp_uid: rsp.imp_uid,
// 					merchant_uid: rsp.merchant_uid,
// 				});
// 				window.close();
// 			} else {
// 				var msg = '결제에 실패하였습니다.';
// 				msg += '에러내용 : ' + rsp.error_msg;
// 				window.close();
// 			}

// 			alert(msg);
// 		}
// 	);
// };

module.exports = router;