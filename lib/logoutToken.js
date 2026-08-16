const redisClient = require('../config/redis');
const LogoutToken = new Map();

exports.addToken = async (token, exp) => {
    LogoutToken.set(token, exp);
    if (redisClient.isOpen) {
        const ttl = Math.max(Math.ceil((exp - Date.now()) / 1000), 1);
        await redisClient.setEx(`bl:${token}`, ttl, '1');
    }
};

exports.isBlacklisted = async (token) => {
    if (LogoutToken.has(token)) return true;
    if (redisClient.isOpen) return (await redisClient.exists(`bl:${token}`)) === 1;
    return false;
};

exports.cleanupTokens = () => {
    const now = Date.now();
    for (const [token, exp] of LogoutToken.entries()) {
        if (exp <= now) LogoutToken.delete(token);
    }
    return LogoutToken.size;
};
