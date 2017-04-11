const co = require('co');

module.exports = {

  index: (req, res) => co(function *() {
    let { lat, lon, cnt } = req.params.all();
    if (!lat || !lon) {
      const { ip } = req;
      const ipGeoData = yield GeoLocation.getCoordinatesByIp(ip);
      if (!ipGeoData) return res.badRequest('can`t identify location');

      lat = Math.floor( ipGeoData.lat ) ;
      lon = Math.floor( ipGeoData.lon ) ;
    }

    try {
      const weather = yield Weather.getByCoordinates(lat, lon, cnt);
      return res.json(weather);
    } catch ({ message }) {
      return res.serverError(message);
    }
  })

};
