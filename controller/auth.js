const Role = require('../model/schemas/role');
const User = require('../model/schemas/user');
const bcrypt = require('bcrypt');
const { validationResult  } = require('express-validator');

const authController = {
  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(`Registration error ${errors.errors[0].msg}`);
      }

      const { username, nickname, email, password } = req.body;
      const newUser = await User.findOne({username});
      if (newUser) {
        return res.send('Username already exists');
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const userRole  = await Role.findOne({value: "USER"})
      const user = new User({username: username, nickname: nickname, email: email, password: hashPassword, roles: [userRole.value]});
      user.save();

      return res.send('User created')
    } catch (e) {
      console.log(e);
      res.send('Registration error');
    }
  },
  
  getRegistrationPage: async (req, res) => {
    res.render('auth');
  },

}

module.exports = authController;
