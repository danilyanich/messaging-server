const messageService = require('./message.service');
const validate = require('./message.validators');

module.exports.list = async (ctx, next) => {
  const currentUser = ctx.state.user;
  const withId = ctx.request.query.withId;

  ctx.body = await messageService.list(currentUser._id, withId);
};

module.exports.markAsRead = async (ctx, next) => {
  const currentUser = ctx.state.user;
  const withId = ctx.request.query.withId;

  await messageService.markHistoryAsRead(currentUser._id, withId);
  ctx.body = null;
};

module.exports.postMessage = async (ctx, next) => {
  const currentUser = ctx.state.user;
  const { error, value } = validate.newMessage(ctx.request.body);
  ctx.assert(!error, 400);
  const { to, text } = value;

  ctx.body = await messageService.create(currentUser._id, to, text);
};
