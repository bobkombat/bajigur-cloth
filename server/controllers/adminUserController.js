const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Admin } = require('../models');

class AdminUserController {
  static login(req, res, next) {

    if (!req.body.email)
      return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA ADMIN IS NOT FOUND"});
    if (!req.body.password)
      return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "EMAIL/PASSWORD IS WRONG"});

    Admin.findOne({where: {email: req.body.email}})
      .then(data => {
        if (!data)
          return next({ statusMessage: "NOT_FOUND", errorMessage: "DATA ADMIN IS NOT FOUND"});

        if (bcrypt.compareSync(req.body.password, data.password)) {
          const access_token = jwt.sign({ id: data.id, email: data.email, role: 'admin' }, process.env.JWT_SECRET);
          return res.status(200).json({ access_token });
        }
        return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "EMAIL/PASSWORD IS WRONG"});
      })
      .catch(err => {
        return next(err)
      });
  }
}

module.exports = AdminUserController;
