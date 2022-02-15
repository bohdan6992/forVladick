const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const users = require('../controller/user');

router.get('/', async (req, res, next) => {
  const user = await users.getUserById(req.params.id);
  res.render('user', { user });
});

module.exports = router;
