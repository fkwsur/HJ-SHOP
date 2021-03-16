const router = require('express').Router();
const {favorController : controller} = require('../controller');

router.post('/', controller.FavoritesWrite); 

router.post('/favorites_list', controller.Favorites_list)

module.exports = router;