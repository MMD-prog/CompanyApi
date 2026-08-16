const cron = require('node-cron');
const winston = require('winston');
require('winston-daily-rotate-file');
const { cleanupTokens } = require('../lib/logoutToken');

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/cron-%DATE%.log',
    datePattern: 'YYYY-MM-DD'
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

cron.schedule('*/5 * * * *', async () => {
    try {
        await cleanupTokens();
        logger.info('Successfully removed expired tokens via the cron job.');
    } catch (err) {
        logger.error(`Failed to remove expired tokens: ${err.message}`);
    }
});

module.exports = logger;