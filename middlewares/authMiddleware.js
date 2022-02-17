const jwt = require('jsonwebtoken');
const { secret } = require('../config/config')

module.exports = function (roles) {
  return function (req, res, next) {

    try {
      [
      body('username')
        .isLength({ min: 4 })
        .withMessage('username must be at least 4 chars long')
        .isLength({ max: 12 })
        .withMessage(' username must be less than 12 chars long')
        .exists()
        .withMessage('username is required')
        .trim()
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage('username must be alphanumeric only')
        .escape(),
      body('nickname')
        .isLength({ min: 4 })
        .withMessage('nickname must be at least 4 chars long')
        .isLength({ max: 12 })
        .withMessage(' nickname must be less than 12 chars long')
        .exists()
        .withMessage('nickname is required')
        .trim()
        .matches(/^[A-Za-z0-9\_]+$/)
        .withMessage('nickname must be alphanumeric only')
        .escape(),
      body('email').isEmail().normalizeEmail().withMessage('Invalid Email').exists().withMessage('email is required'),
      body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 chars long')
        .isLength({ max: 30 })
        .withMessage('password must be at max 30 chars long')
        .matches(/\d/)
        .withMessage('password must contain a number')
        .exists()
        .withMessage('password is required'),
      ];

      next();
    } catch (error) {
      console.log(error)
    }
  }
}
