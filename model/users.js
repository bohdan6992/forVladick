const User = require('./schemas/user');
const mongoose = require('mongoose');


const createUser = async (obj) => {
  const user = new User({
    name: obj.name,
    nickname: obj.nickname,
    email: obj.email,
    password: obj.password, 
    addedwords: obj.addedwords, 
    learnedwords: obj.learnedwords, 
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
