const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

const ForbidErr = require('../errors/forbidden-err');

const createCard = (req, res, next) => {
  const {
    name, link, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, createdAt,
  })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const allCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};
const delCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return card.remove(req.params.cardId)
          .then(() => res.status(200).send(card));
      }
      throw new ForbidErr('Нет прав на удаление');
    })
    .catch(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

module.exports = { createCard, allCards, delCard };
