const Router = require('koa-router');
const userController = require('./user.controller');

const privateRouter = new Router();

privateRouter.get('/', userController.list);
privateRouter.get('/me', userController.getMe);

module.exports.private = [privateRouter.routes(), privateRouter.allowedMethods()];
