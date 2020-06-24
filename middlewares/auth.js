const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new AuthErr('Необходима авторизация');
};

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return handleAuthError(res);
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
