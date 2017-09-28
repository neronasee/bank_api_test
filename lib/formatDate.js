const moment = require('moment');

module.exports = (date) => moment(date).utc().format('YYYY-MM-DD');

