const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { createUser } = require('../model/users');

const data = {
  name: 'Oleg',
  nickname: 'Ok',
  email: 'profix.ok@gmail.com',
  password: 'oleg1234', 
  addedwords: 0, 
  learnedwords: 0, 
}

router.get('/', async (req, res) => {
  const user = await createUser(data);
  res.send('user is ok');
});

module.exports = router;
