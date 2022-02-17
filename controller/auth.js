const Role = require('../model/schemas/role');
const User = require('../model/schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }

  return jwt.sign(payload, secret);
};

const authController = {

  registration: async (req, res) => {
    try {
      const { username, nickname, email, password } = req.body;
      const newUser = await User.findOne({nickname}); 
      const newEmail = await User.findOne({email});
      // check by all unique params
      if (newUser) {
        return res.send('Nickname already exists');
      }
      if (newEmail) {
        return res.send('Email already exists');
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
      let userId = '';
      user.save((err, result) => {
        if (err) return console.log(err);
        userId = result._id
          .match(/(?:"[^"]*"|^[^"]*$)/)[0]
          .replace(/"/g, "")
      });
      
      const token = generateAccessToken(user._id, user.roles);
      return res
               .cookie('access_token', token)
               .json({token, page: `/user/${userId}`});
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
      const token = generateAccessToken(user._id, user.roles);
      return res
               .cookie('acces_token', token)
               .json({token, page: '/user'});

      // res.send('/user');
    } catch (err) {
      console.log(err);
      res.send('Login error');
    }
    
  },

  logout: async (req, res) =>{
    return res
      .clearCookie('access_token')
      .redirect('http://127.0.0.1:3000/auth/login');

  },

  getLoginPage: async (req, res) => {
    console.log(req.body);
    res.render('login');
  },

};

module.exports = authController;
