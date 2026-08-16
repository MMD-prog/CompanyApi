const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' });
redisClient.on('error', () => {});
redisClient.connect().catch(() => {});

module.exports = redisClient;
