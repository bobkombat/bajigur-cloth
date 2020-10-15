module.exports = (req, res, next) => {
  if (req.userLogin.role != 'admin' && req.userLogin.role != "user")
    return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "UNAUTHORIZED ROLE"});
  return next();
}
