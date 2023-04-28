const router = require('express').Router();

let userController = require('../controllers/userController');

router.route('/user').post((res, req) => userController.create(res, req));

module.exports = router;