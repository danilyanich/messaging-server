const jwt = require('jsonwebtoken');
const config = require('serverConfig');

const validate = require('./auth.validators');

const userService = require('resources/user/user.service');

module.exports.signUp = async (ctx, next) => {
  const { error, value } = validate.signUp(ctx.request.body);
  ctx.assert(!error, 400);
  const { username } = value;

  const presentUser = await userService.findByUsename(username);
  if (presentUser) {
    ctx.body = jwt.sign({ _id: presentUser._id }, config.secret);
  } else {
    const user = await userService.create(username);
    ctx.body = jwt.sign({ _id: user._id }, config.secret);
  }
};
