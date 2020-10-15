const jwt = require('jsonwebtoken');
const { User, Admin } = require('../models');

module.exports = (req, res, next) => {
  if (!req.headers.access_token)
    return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "ACCESS TOKEN IS NOT FOUND"})

  try {
    const dataVerified = jwt.verify(req.headers.access_token, process.env.JWT_SECRET);

    if (dataVerified.role == "admin") {
      Admin.findOne({where: {id: dataVerified.id}})
        .then(data => {
          if (!data || data == null)
            return next({ statusMessage: "INVALID_SIGNATURE", errorMessage: "INVALID ACCESS TOKEN"})
          req.userLogin = dataVerified;
          return next()
        })
        .catch(err => next(err))
    } else {
      User.findOne({where: {id: dataVerified.id}})
        .then(data => {
          if (!data || data == null)
            return next({ statusMessage: "INVALID_SIGNATURE", errorMessage: "INVALID ACCESS TOKEN"});
          else {
            req.userLogin = dataVerified;
            return next();
          }
        })
        .catch(err => next(err))
    }
  } catch (err) {
    next(err);
  }
}
