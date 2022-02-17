const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const user = require('../controller/user');

router.get('/:id', async (req, res) => {
  const userById = await user.getUserById(req.params.id);
  res.render('user', { userById });
});

module.exports = router;
