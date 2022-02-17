const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { check } = require('express-validator');
const authController = require('../controller/auth');

router.get('/registration', authController.getRegistrationPage);

router.post('/registration', upload.none(), 
[
  check('username')
    .notEmpty()
    .withMessage('Username can\'t be empty'),

  check('nickname')
    .notEmpty()
    .withMessage('Nickname can\'t be empty'),

  check('email')
    .notEmpty()
    .withMessage('Email can\'t be empty')
    .isEmail()
    .withMessage('Email isn\'t valid'),

  check('password')
    .notEmpty()
    .withMessage('Pasword can\'t be empty')
    .isLength({min:8})
    .withMessage('Password must be more than 8 characters'),
], 
authController.registration);

router.get('/login', authController.getLoginPage);

router.post('/login', upload.none(), authController.login);

router.get('/logout', authController.logout);

module.exports = router;