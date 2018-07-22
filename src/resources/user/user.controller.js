const userService = require('./user.service');

module.exports.list = async (ctx, next) => {
  ctx.body = await userService.list();
};

module.exports.getMe = async (ctx, next) => {
  const currentUser = ctx.state.user;

  ctx.body = await userService.findById(currentUser._id);
};
