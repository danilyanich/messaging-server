const messageService = require('./message.service');
const validate = require('./message.validators');

module.exports.getById = async (ctx, next) => {
  const { messageId } = ctx.request.query;
  const message = await messageService.findOne(messageId);
  ctx.body = message;
};

module.exports.list = async (ctx, next) => {
  const { _id: senderId } = ctx.state.user;
  const { receiverId } = ctx.request.query;

  const myMessages = await messageService.find([
    ['senderId', '==', senderId],
    ['receiverId', '==', receiverId],
  ]);

  const hisMessages = await messageService.find([
    ['senderId', '==', receiverId],
    ['receiverId', '==', senderId],
  ]);

  ctx.body = [...myMessages, ...hisMessages];
};

module.exports.markAsRead = async (ctx, next) => {
  const { _id: receiverId } = ctx.state.user;
  const { senderId } = ctx.request.query;

  await messageService.markHistoryAsRead(senderId, receiverId);
  ctx.body = null;
};

module.exports.postMessage = async (ctx, next) => {
  const { _id: senderId } = ctx.state.user;

  const { error, value } = validate.newMessage(ctx.request.body);
  ctx.assert(!error, 400);
  const { receiverId, message } = value;

  const createdMessage = await messageService.create({
    senderId, receiverId, message, isRead: false,
  });

  ctx.body = createdMessage;
};
