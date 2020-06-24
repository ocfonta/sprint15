const cardsRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, allCards, delCard } = require('../controllers/cards');

cardsRoute.get('/', allCards);

cardsRoute.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardsRoute.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), delCard);

module.exports = cardsRoute;
