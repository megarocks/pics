const co = require('co');

module.exports = {

  index: (req, res) => co(function *() {
    const { lat, lon, cnt } = req.params.all();
    if (!lat || !lon) return res.badRequest();

    try {
      const weather = yield Weather.getByCoordinates(lat, lon, cnt);
      return res.json(weather);
    } catch ({ message }) {
      return res.serverError(message);
    }
  })

};
