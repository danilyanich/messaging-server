const mount = require('koa-mount');
const jwt = require('jsonwebtoken');
const config = require('./serverConfig');
const userService = require('resources/user/user.service');

const authResource = require('resources/auth');
const userResource = require('resources/user');
const messageResource = require('resources/message');

const errorHandlerMiddleWare = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);
    ctx.throw(400, error);
  }
};

const authMiddleware = async (ctx, next) => {
  const authHeader = ctx.request.header.authorization;
  ctx.assert(authHeader, 400, 'No authorization header present');

  try {
    const token = jwt.verify(authHeader, config.secret);
    ctx.assert(token, 401, 'Invalid token');
    const { _id } = token;

    const user = await userService.findOne(_id);
    ctx.assert(user, 404, 'Valid token, but no such user');

    ctx.state.user = user;
    return next();
  } catch (error) {
    console.error(error);
    ctx.throw(400, error);
  }
};

module.exports = (app) => {
  app.use(errorHandlerMiddleWare);

  app.use(mount('/auth', ...authResource.public));

  app.use(authMiddleware);

  app.use(mount('/users', ...userResource.private));
  app.use(mount('/messages', ...messageResource.private));
};
