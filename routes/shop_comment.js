const router = require('express').Router();
const {CommentController : controller} = require('../controller');

router.post('/', controller.Comments);
router.get('/comment_list', controller.Comment_list);

module.exports = router;