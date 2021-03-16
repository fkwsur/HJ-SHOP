const router = require('express').Router();
const { basketController : controller } = require('../controller');

router.post('/', controller.basketWrite); 

router.post('/basket_list', controller.Basket_List)

module.exports = router;