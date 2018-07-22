const Router = require('koa-router');
const userController = require('./message.controller');

const privateRouter = new Router();

privateRouter.get('/:withId', userController.list);
privateRouter.post('/newMessage', userController.postMessage);
privateRouter.post('/markAdRead/:withId', userController.markAsRead);

module.exports.private = [privateRouter.routes(), privateRouter.allowedMethods()];
