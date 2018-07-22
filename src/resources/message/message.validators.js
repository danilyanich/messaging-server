const Joi = require('joi');

const newMessageSchema = Joi.object().keys({
  to: Joi.string().required(),
  text: Joi.string().required(),
});

module.exports.newMessage = (message) => Joi.validate(message, newMessageSchema);
