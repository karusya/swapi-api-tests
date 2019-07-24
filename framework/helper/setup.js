const chai = require ('chai');
const expect = chai.expect;
chai.use (require ('chai-json-schema'));
chai.use (require ('chai-json-equal'));
global.assert = chai.assert;
global.should = chai.should ();
global.retryCount = 2;
const { createLogger, format, transports } = require('winston');

global.logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

