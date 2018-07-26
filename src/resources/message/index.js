const Router = require('koa-router');
const userController = require('./message.controller');

const privateRouter = new Router();

privateRouter.get('/', userController.list);
privateRouter.get('/:messageId', userController.getById);
privateRouter.post('/', userController.postMessage);
privateRouter.post('/markAdRead', userController.markAsRead);

module.exports.private = [privateRouter.routes(), privateRouter.allowedMethods()];
