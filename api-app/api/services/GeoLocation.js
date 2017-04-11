const geoip = require('geoip-lite');

module.exports = {

  getCoordinatesByIp: (rawIp) => new Promise((resolve, reject) => {

    try {
      const ip = rawIp.match(
        /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/ig
      )[0];

      if (!ip) return resolve(null);

      const geoData = geoip.lookup(ip);
      const { ll: [lat, lon] } = geoData || {};
      if (!lat || !lon) return resolve(null);

      return resolve({lat, lon});
    } catch ({message}) {
      return reject(message);
    }
  })
};
