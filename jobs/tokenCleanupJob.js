const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { removeExpiredTokens } = require('../lib/logoutToken');

const Folder = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(Folder)) {
    fs.mkdirSync(Folder);
}

const logPath = path.join(Folder, 'cronJobs.log');

function logMessage(message) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    fs.appendFileSync(logPath, `[${now}] ${message}\n`);
}

cron.schedule('0 12 * * *', function () {
    try {
        removeExpiredTokens();
        logMessage('Successfully removed expired tokens via the cron job.');
    } catch (error) {
        logMessage('Unable to remove: ' + error.message);
    }
});