const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/unauthorized-err');

const handleAuthError = () => {
  throw new AuthErr('Необходима авторизация');
};

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return handleAuthError(res);
  }
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
