const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authController = require('../controller/auth');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, userValidationRules } = require('../middlewares/validationMiddleware');


router.get('/registration', authController.getRegistrationPage);

router.post('/registration', upload.none(), userValidationRules(), validate, authController.registration);

router.get('/login', authController.getLoginPage);

router.post('/login', upload.none(), authController.login);

router.get('/logout', authController.logout);

module.exports = router;