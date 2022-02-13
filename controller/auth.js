const Role = require('../model/schemas/role');
const User = require('../model/schemas/user')
const bcrypt = require('bcrypt');

const authController = {

  login: async (req, res) => {
    try {
      
    } catch (err) {
      console.log(err);
      es.send('Login error');
    }
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.send(`Пользователь с таким email ${email} не найден`);
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Введен не верный пароль');
    }
    console.log(user.email);
    res.send('/user');
  },
  getLoginPage: async (req, res) => {
    console.log(req.body);
    res.render('login');
  },
};

module.exports = authController;