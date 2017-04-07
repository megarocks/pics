const co = require('co');
const jwt = require('jsonwebtoken');

const { jwtSecret, tokenExpiration } = sails.config;

module.exports = {

  register: (req, res) => co(function *() {
    const { username, password } = req.params.all();
    if (!username || !password) res.badRequest();

    try {
      const registeredUser = yield User.registerNew(username, password);
      const { id } = registeredUser;
      return res.created({ id });
    } catch ({ message }) {
      return res.serverError(message);
    }
  }),

  login: (req, res) => co(function *() {
    const { username, password } = req.params.all();
    if (!username || !password) return res.badRequest();

    const userId = yield User.getUserIdByCredentials(username, password);
    if (!userId) return res.forbidden('Incorrect credentials');

    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * tokenExpiration),
      userId
    }, jwtSecret);

    return res.json({ token });
  }),

  checkToken: (req, res) => co(function *() {
    const { token } = req.params.all();
    if (!token) return res.badRequest();

    const decodedTokenData = jwt.verify(token, jwtSecret);

    return res.json({ decodedTokenData });
  }),

};
