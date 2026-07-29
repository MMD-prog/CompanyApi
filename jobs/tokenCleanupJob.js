const cron = require('node-cron');
<<<<<<< HEAD
const { removeExpiredTokens } = require('../lib/logoutToken');

cron.schedule('0 3 * * *', () => {
=======
const { removeExpiredTokens } = require('../lib/blacklistedTokens');

cron.schedule('0 * * * *', () => {
>>>>>>> d6dc4be95747c05011386b99e19da3459c148acb
    removeExpiredTokens();
});
