const isURL = require('validator/lib/isURL');
const BadReqError = require('../errors/bad-request');

module.exports.urlValidator = (url) => {
  const reqUrl = isURL(url);
  if (reqUrl !== true) {
    throw new BadReqError('Некорректная ссылка');
  } else return url;
};
