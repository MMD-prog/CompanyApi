const cron = require('node-cron');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
const { removeExpiredTokens } = require('../lib/logoutToken');

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '..', 'logs', 'cronJobs-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d',
    maxSize: '20m'
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [fileRotateTransport]
});

cron.schedule('* * * * *', function () {
    try {
        removeExpiredTokens();
        logger.info('Successfully removed expired tokens via the cron job.');
    } catch (error) {
        logger.error('Unable to remove: ' + error.message);
    }
});