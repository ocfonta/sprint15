const errorHandle = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500

  let { statusCode = 500 } = err;
  const { message } = err;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
  }
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};

module.exports = { errorHandle };
