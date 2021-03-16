const answerRouter = require('./answer');
const askRouter = require('./ask');
const basketRouter = require('./basket');
const boardRouter = require('./board');
const emailRouter = require('./email');
const favorRouter = require('./favorites');
const memberRouter = require('./member');
const productRouter = require('./product');
const CommentRouter = require('./shop_comment');
const paypalRouter = require('./paypal');

module.exports = {
	answerRouter,
	askRouter,
	basketRouter,
	boardRouter,
	emailRouter,
	favorRouter,
	memberRouter,
	productRouter,
	CommentRouter,
	paypalRouter
}
