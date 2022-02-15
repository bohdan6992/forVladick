const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authController = require('../controller/auth');
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/registration', authController.getRegistrationPage);

router.post('/registration',authMiddleware(), upload.none(), authController.registration);

router.get('/login', authController.getLoginPage);

router.post('/login', upload.none(), authController.login);

module.exports = router;