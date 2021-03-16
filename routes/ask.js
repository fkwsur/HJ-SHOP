const router = require('express').Router();
const { askController : controller } = require('../controller');

router.post('/qna', controller.Qna); 

router.get('/AdminQna', controller.AdminQna); 

router.post('/qnaId_post', controller.QnaId_Post); 

module.exports = router;