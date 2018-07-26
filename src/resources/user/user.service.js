const db = require('db.service');
const schema = require('./user.schema');

const users = db.createService('user', schema);

module.exports = users;
