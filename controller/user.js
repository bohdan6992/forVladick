const {
  getUserById,
} = require('../model/users');

const students = {
  getUserById: async (id) => {
    return await getUserById(id); 
  }, 
};

module.exports = students;
