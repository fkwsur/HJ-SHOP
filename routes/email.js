const router = require('express').Router();
const { emailController : controller } = require('../controller');
router.post('/emailAuth', controller.EmailAuth);

module.exports = router;
