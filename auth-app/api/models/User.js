const crypto = require('crypto');
const co = require('co');

module.exports = {
  tableName: 'users',
  attributes: {
    username: {
      type: 'string',
      unique: true,
    },
    password: {
      type: 'string',
    }
  },

  registerNew: (username, password) => {
    return User.create({ username, password: getPasswordHash(password) });
  },

  getUserIdByCredentials: (username, password) => co(function *() {
    const user = yield User.findOne({ username, password: getPasswordHash(password) });
    const { id } = user || {};
    return Promise.resolve(id);
  })
};

function getPasswordHash(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}
