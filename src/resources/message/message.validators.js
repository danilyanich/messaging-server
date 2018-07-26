const Joi = require('joi');

const newMessageSchema = Joi.object().keys({
  receiverId: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports.newMessage = (message) => Joi.validate(message, newMessageSchema);
