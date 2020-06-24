const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRoute = require('./routes/users');
const cards = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

const auth = require('./middlewares/auth');

const { errorHandle } = require('./middlewares/errorHandle');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new Error('Некорректная почта')),
    password: Joi.string().required().min(6),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().required().email().error(new Error('Некорректная почта')),
    password: Joi.string().required().min(6).error(new Error('Пароль должен содержать не менее 6 символов')),

  }),
}), createUser);

app.use('/users', auth, usersRoute);

app.use('/cards', auth, cards);
app.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandle);

app.listen(PORT, () => {

// console.log(`App listening on port ${PORT}`);
});
