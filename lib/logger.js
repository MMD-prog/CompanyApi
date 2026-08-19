const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
);

const errorTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '..', 'logs', 'app-errors-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxFiles: '30d',
    maxSize: '20m'
});

const combinedTransport = new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, '..', 'logs', 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    maxFiles: '30d',
    maxSize: '20m'
});

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        errorTransport,
        combinedTransport,
        new winston.transports.Console()
    ]
});

const logError = (err, req = null) => {
    const method = req ? req.method : 'N/A';
    const url = req ? req.originalUrl || req.url : 'N/A';
    const ip = req ? (req.ip || req.socket?.remoteAddress || '127.0.0.1') : 'N/A';
    const status = err.status || err.statusCode || 500;

    const message = `${method} ${url} - ${status} - IP: ${ip} - Message: ${err.message}${err.stack ? ` - Stack: ${err.stack}` : ''}`;
    logger.error(message);
};

module.exports = {
    logger,
    logError
};
