const jwt = require('jsonwebtoken');
const passwordHashAndSalt = require('password-hash-and-salt');
const config = require('serverConfig');

const validate = require('./auth.validators');
const userService = require('resources/user/user.service');

const hash = (password) => new Promise((resolve, reject) => {
  passwordHashAndSalt(password).hash((error, hash) => {
    if (error) reject(error);
    else resolve(hash);
  });
});


module.exports.signUp = async (ctx, next) => {
  const { error, value } = validate.signUp(ctx.request.body);
  ctx.assert(!error, 400);
  const { username, password } = value;

  const presentUser = await userService.findOne([
    ['username', '==', username],
  ]);

  if (presentUser) {
    const valid = await validate.hash(
      password,
      presentUser.passwordHash,
    );

    ctx.assert(valid, 401, 'Invalid password');

    ctx.body = jwt.sign({ _id: presentUser._id }, config.secret);
  } else {
    const passwordHash = await hash(password);

    const user = await userService.create({
      username, passwordHash,
    });

    ctx.body = jwt.sign({ _id: user._id }, config.secret);
  }
};
