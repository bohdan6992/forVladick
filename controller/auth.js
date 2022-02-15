const Role = require('../model/schemas/role');
const User = require('../model/schemas/user');
const bcrypt = require('bcrypt');

const authController = {

  registration: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.send(`Registration error ${errors.errors[0].msg}`);
      }
      const { username, nickname, email, password } = req.body;
      const newUser = await User.findOne({username}); 
      // check by all unique params
      if (newUser) {
        return res.send('Username already exists');
      }
    
      const hashPassword = bcrypt.hashSync(password, 10);
      const userRole  = await Role.findOne({value: "USER"})
      const user = new User({
        username, 
        nickname, 
        email, 
        password: hashPassword, 
        roles: [userRole.value],
        addedwords: 0,
        learnedwords: 0,
      });
      user.save();
      // JWT
      return res.send('User created')
      
    } catch (e) {
      console.log(e);
      res.send('Registration error');
    }
  },
  
  getRegistrationPage: async (req, res) => {
    res.render('registration');
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({email});
    if (!user) {
      return res.send(`Пользователь с таким email ${email} не найден`);
    }
      const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.send('Введен не верный пароль');
    }
      // JWT
      res.send('/user');
    } catch (err) {
      console.log(err);
      res.send('Login error');
    }
    
  },

  getLoginPage: async (req, res) => {
    console.log(req.body);
    res.render('login');
  },

};

module.exports = authController;
