const User = require('./schemas/user');
// const mongoose = require('mongoose');

const getUserById = async (id) => {
  const user = await User.find({ _id: id });
  return user[0];
};

module.exports = {
  getUserById,
};
