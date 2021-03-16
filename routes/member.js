const router = require('express').Router();
const {memberController : controller} = require('../controller');




router.post('/signup', controller.Signup); 

router.post('/confirm', controller.Confirm);


router.post('/login', controller.Login);

module.exports = router;