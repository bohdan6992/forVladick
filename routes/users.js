const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { createUser } = require('../model/users');

router.get('/', async (req, res) => {
  const user = await createUser();
  res.send('user is ok');
});

module.exports = router;
