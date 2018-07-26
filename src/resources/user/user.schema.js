const Joi = require('joi');

const userSchema = Joi.object().keys({
  username: Joi.string().required(),
  passwordHash: Joi.string().required(),
});

module.exports = userSchema;
