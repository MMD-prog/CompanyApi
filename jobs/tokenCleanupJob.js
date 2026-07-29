const cron = require('node-cron');
const { removeExpiredTokens } = require('../lib/blacklistedTokens');

cron.schedule('0 * * * *', () => {
    removeExpiredTokens();
});
