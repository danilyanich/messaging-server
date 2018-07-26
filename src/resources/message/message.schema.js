const Joi = require('joi');

const messageSchema = Joi.object().keys({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  message: Joi.string().required(),
  isRead: Joi.bool().required(),
});

module.exports = messageSchema;
