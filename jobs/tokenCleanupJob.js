const cron = require('node-cron');
const { removeExpiredTokens } = require('../lib/logoutToken');

cron.schedule('0 3 * * *', () => {
    removeExpiredTokens();
});
