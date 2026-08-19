require('dotenv').config();
require('./config/swagger');
require('./config/redis');
require('./jobs/tokenCleanupJob');
const express = require('express');
const { sequelize } = require('./lib');
const registerRoutes = require('./Routes');
const { logger } = require('./lib/logger');

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message} - Stack: ${err.stack}`);
});

process.on('unhandledRejection', (reason) => {
    const msg = reason instanceof Error ? `${reason.message} - Stack: ${reason.stack}` : reason;
    logger.error(`Unhandled Rejection: ${msg}`);
});

const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => {
        logger.info('Database connected.');
        registerRoutes(app);
        app.use(require('./middleware/errorHandler').errorHandler);
        app.listen(process.env.PORT, () => {
            logger.info(`Server running on ${process.env.APP_URL}`);
        });
    })
    .catch((err) => {
        logger.error(`Could not connect to database: ${err.message}`);
        process.exit(1);
    });