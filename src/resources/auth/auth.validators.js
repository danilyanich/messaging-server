const Joi = require('joi');
const passwordHashAndSalt = require('password-hash-and-salt');

const singUpSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
});

module.exports.signUp = (signUpData) => Joi.validate(signUpData, singUpSchema);

module.exports.hash = (password, passwordHash) => new Promise((resolve, reject) => {
  passwordHashAndSalt(password).verifyAgainst(passwordHash, (error, verified) => {
		if (error) reject(error);
		else resolve(verified);
	});
});
