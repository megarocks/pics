const co = require('co');
const jwt = require('jsonwebtoken');

const { jwtSecret } = sails.config;

module.exports = function (req, res, next) {
  co(function *() {
    const { authorization: authHeader = '' } = req.headers;
    const [, token] = authHeader.split(' ');
    try {
      const decodedToken = yield promisifiedVerify(token, jwtSecret);
      sails.log.debug({ decodedToken });
      next();
    } catch ({ message }) {
      return res.forbidden(message);
    }
  })
};

const promisifiedVerify = (token, secret) => new Promise((resolve, reject) => {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return reject(err);

    return resolve(decoded);
  })
});


