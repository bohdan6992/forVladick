const User = require('./schemas/user');
const mongoose = require('mongoose');

const createUser = async (obj) => {
  const user = new User({
    username: obj.username,
    nickname: obj.nickname,
    email: obj.email,
    password: obj.password, 
    addedwords: 0, 
    learnedwords: 0, 
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
};
