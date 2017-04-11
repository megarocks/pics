const co = require('co');
const moment = require('moment');
const rp = require('request-promise-native');

module.exports = {
  tableName: 'weather',
  attributes: {
    lat: {
      type: 'float'
    },
    lon: {
      type: 'float'
    },
    weather: {
      type: 'json'
    }
  },

  getCached: (lat, lon, cnt) => {
    return Weather.findOne({
      lat, lon, cnt,
      updatedAt: { '>=' :  moment().subtract(sails.config.weatherCacheTimeout, 'minutes').toDate() }
    })
  },

  cache: (lat, lon, cnt, weather) => co(function *() {
    yield Weather.destroy({ lat, lon, cnt });
    return Weather.create({ lat, lon, cnt, weather })
  }),

  getByCoordinates: (lat, lon, cnt = 13) => co(function *() {
    const weatherFromCache = yield Weather.getCached(lat, lon, cnt);
    if (weatherFromCache) {
      sails.log.debug('Serving weather from cache');
      return Promise.resolve(weatherFromCache);
    }

    const weatherApiOptions = {
      uri: `${sails.config.weatherApiUrl}/forecast/daily`,
      qs: { lat, lon, cnt,
        units: 'metric',
        APPID: sails.config.weatherApiKey
      },
      json: true
    };

    sails.log.debug('Fetching weather from provider ', weatherApiOptions);
    const weather = yield rp(weatherApiOptions);
    const cachedWeather = yield Weather.cache(lat, lon, cnt, weather);
    return Promise.resolve(cachedWeather);
  })
};
