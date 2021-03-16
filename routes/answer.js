const router = require('express').Router();
const { answerController : controller } = require('../controller');

router.post('/qnaAnswer', controller.QnaAnswer); 

router.post('/qnaAnswerList', controller.QnaAnswerList); 

module.exports = router;