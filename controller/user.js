const { getUserById } = require('../model/user');

const user = {
  getUserById: async (id) => {
    return await getUserById(id); 
  }, 
};

module.exports = user;
