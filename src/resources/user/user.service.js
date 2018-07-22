const uuid = require('uuid/v1');

const users = [];

module.exports.create = async (username) => {
  const newUser = {
    _id: 'user-'+uuid(),
    username,
  };

  users[newUser._id] = newUser;

  return newUser;
};

module.exports.findById = async (_id) => {
  return users[_id];
};

module.exports.findByIds = async (ids) => {
  return ids.map(_id => users[_id]);
};

module.exports.list = async () => {
  return Object.values(users);
};

module.exports.findByUsename = async (username) => {
  return Object.values(users).find(user => user.username === username);
};
