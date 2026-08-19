const cron = require('node-cron');
const { cleanupTokens } = require('../lib/logoutToken');
const { logger } = require('../lib/logger');

cron.schedule('*/5 * * * *', async () => {
    try {
        await cleanupTokens();
        logger.info('Successfully removed expired tokens via the cron job.');
    } catch (err) {
        logger.error(`Failed to remove expired tokens: ${err.message}`);
    }
});

module.exports = logger;