const router = require('express').Router();
const { boardController : controller } = require('../controller');

router.post('/board', controller.Board);

router.get('/board_list', controller.Board_list)

router.post('/board_detail', controller.Board_detail)

router.post('/boardUpdate', controller.BoardUpdate)

router.post('/boardDelete', controller.BoardDelete)


module.exports = router;