const express = require('express');
const router = express.Router();
const logController = require('../controllers/loginController');

router.route('/')
    .post(logController.loginUser)

module.exports = router;