const userService = require('./user.service');

module.exports.getById = async (ctx, next) => {
  const { userId } = ctx.request.query;

  const user = await userService.findOne(userId);

  ctx.body = {
    _id: user._id,
    username: user.username
  };
};

module.exports.getMe = async (ctx, next) => {
  const { _id: currentUserId } = ctx.state.user;

  const user = await userService.findOne(currentUserId);

  ctx.body = {
    _id: user._id,
    username: user.username,
  };
};

module.exports.list = async (ctx, next) => {
  const users = await userService.find();

  const cleanUsers = users.map(user => ({
    _id: user._id,
    username: user.username,
  }));

  ctx.body = cleanUsers;
};
