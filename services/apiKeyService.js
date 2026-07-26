const crypto = require('crypto');
const { ApiKey } = require('../models');

async function createApiKey(name) {
    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('API key name is required');
    }

    const key = crypto.randomBytes(32).toString('hex');
    return await ApiKey.create({ name: name.trim(), key });
}

module.exports = {
    createApiKey
};
