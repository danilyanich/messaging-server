const uuid = require('uuid/v1');

const messages = [];

module.exports.create = async (fromId, toId, text) => {
  const newMessage = {
    _id: 'message-'+uuid(),
    fromId,
    toId,
    text,
    read: false,
  };

  messages[newMessage._id] = newMessage;

  return newMessage;
};

module.exports.list = async (fromId, withId) => {
  return Object.values(messages).filter(message =>
    message.fromId === fromId && messages.toId === withId
  );
};

module.exports.markHistoryAsRead = async (fromId, withId) => {
  Object.values(messages).filter(message =>
    message.fromId === fromId && messages.toId === withId
  ).forEach(message => {
    messages[message._id].read = true;
  });
}
