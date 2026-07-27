const redisClient = require('../config/redis');

exports.addTokenToBlacklist = async (token, ttlSeconds = 86400) => {
    try {
        if (redisClient.isOpen) {
            await redisClient.set(`blacklisted:${token}`, 'true', { EX: ttlSeconds });
        }
    } catch (err) {}
};

exports.isTokenBlacklisted = async (token) => {
    try {
        if (redisClient.isOpen) {
            const exists = await redisClient.exists(`blacklisted:${token}`);
            return exists === 1;
        }
    } catch (err) {}
    return false;
};