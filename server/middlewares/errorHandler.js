module.exports = (err, req, res, next) => {
  let statusCode = 500,
      errorMessage = "INTERNAL_SERVER_ERROR",
      statusMessage = "INTERNAL_SERVER_ERROR";

  if (err.name == "SequelizeValidationError")
  {
    statusCode = 400;
    errorMessage = err.errors.map(x => x.errorMessage);
    statusMessage = "VALIDATION_ERROR";
  }
  else if (err.statusMessage == "NOT_FOUND")
  {
    statusCode = 404;
    errorMessage = err.errorMessage;
    statusMessage = err.statusMessage;
  }
  else if (err.statusMessage == "INVALID_ACCOUNT" || err.name == "JsonWebTokenError")
  {
    statusCode = 401;
    errorMessage = err.errorMessage;
    statusMessage = err.statusMessage || "INVALID_SIGNATURE";
  }

  return res.status(statusCode).json({ errorMessage, statusMessage })
}
