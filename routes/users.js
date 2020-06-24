const usersRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { allUsers, idUser } = require('../controllers/users');

// GET
usersRoute.get('/', allUsers);
usersRoute.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).error(new Error('Некорректный id')),
  }),
}), idUser);

module.exports = usersRoute;
