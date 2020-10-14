const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

class UserController {
  static login(req, res, next) {
    if (!req.body.email)
      return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA USER IS NOT FOUND"});
    if (!req.body.password)
      return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "EMAIL/PASSWORD IS WRONG"});

    User.findOne({where: {email: req.body.email}})
      .then(data => {
        if (!data)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA USER IS NOT FOUND"});

        if (bcrypt.compareSync(req.body.password, data.password)) {
          const access_token = jwt.sign({ id: data.id, email: data.email, address: data.address, postoffice: data.postoffice }, process.env.JWT_SECRET);
          return res.status(200).json({ access_token });
        }
        return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "EMAIL/PASSWORD IS WRONG"});
      })
      .catch(err => next(err))
  }

  static register(req, res, next) {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      address: req.body.address || null,
      postoffice: req.body.postoffice || null
    }

    User.findOne({where: { email: userData.email }})
      .then(data => {
        if (data)
          return next({statusMessage: "INVALID_ACCOUNT", errorMessage: "ACCOUNT ALREADY EXIST"})
        return User.create(userData);
      })
      .then(response => {
        console.log('test')
        console.log(response);
        return res.status(201).json({ id: response.id, email: response.email, password: response.password, address: response.address, postoffice: response.postoffice});
      })
      .catch(err => next(err))
  }
}

module.exports = UserController;
