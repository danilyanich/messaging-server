const Joi = require('joi');

const userSchema = Joi.object().keys({
  _id: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports.user = (user) => Joi.validate(user, userSchema);

const singUpSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports.signUp = (signUpData) => Joi.validate(signUpData, singUpSchema);
