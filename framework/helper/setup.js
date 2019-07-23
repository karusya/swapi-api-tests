const chai = require ('chai');
const expect = chai.expect;
chai.use (require ('chai-json-schema'));
chai.use (require ('chai-json-equal'));
global.assert = chai.assert;
global.should = chai.should ();
global.retryCount = 2;

/* const winston = require('winston');
global.logger = winston;

const logLevel = process.env.logLevel;
if (logLevel !== undefined) {
    winston.level = logLevel;
} else {
    winston.level = 'error';
}

winston.add(winston.transports.File,
    {
        filename: './logs/' + Date.now() + '.log',
        level: 'debug',
        prettyPrint: true
    });
winston.addColors(
    {
        silly: 'magenta',
        debug: 'blue',
        verbose: 'cyan',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    });
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console,
    {
        level: logLevel,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: false
    }); */
