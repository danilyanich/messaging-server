const Router = require('koa-router');
const authController = require('./auth.controller');

const publicRouter = new Router();

publicRouter.post('/signUp', authController.signUp);

module.exports.public = [publicRouter.routes(), publicRouter.allowedMethods()];
