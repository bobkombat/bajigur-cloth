module.exports = (req, res, next) => {
  if (req.userLogin.role != 'admin')
    return next({ statusMessage: "INVALID_ACCOUNT", errorMessage: "UNAUTHORIZED ROLE"});
  return next();
}
