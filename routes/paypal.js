const router = require('express').Router();
const {paypalController : controller} = require('../controller');

router.post('/geturl', controller.GetURL);

router.post('/pay_ok', controller.Pay_Ok);



module.exports = router;