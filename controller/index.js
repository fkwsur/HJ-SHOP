const answerController = require('./answer');
const askController = require('./ask');
const basketController = require('./basket');
const boardController = require('./board');
const emailController = require('./email');
const favorController = require('./favorites');
const memberController = require('./member');
const productController = require('./product');
const CommentController = require('./shop_comment');
const paypalController = require('./paypal');

module.exports = {
	answerController,
	askController,
	basketController,
	boardController,
	emailController,
	favorController,
	memberController,
	productController,
	CommentController,
	paypalController
}