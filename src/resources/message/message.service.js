const db = require('db.service');
const schema = require('./message.schema');

const messages = db.createService('message', schema);

messages.markHistoryAsRead = async (senderId, receiverId) => {
  const messagesQuery = await messages.applyQuery([
    ['senderId', '==', senderId],
    ['receiverId', '==', receiverId],
  ]).get();

  messagesQuery.forEach(doc => {
    messages.doc(doc.id).update({
      isRead: true,
    });
  });
};

module.exports = messages;
