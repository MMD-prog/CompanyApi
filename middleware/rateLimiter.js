const redisClient = require('../config/redis');

const rateLimiter = (options = {}) => {
    const max = options.max || 10;
    const windowSeconds = options.windowSeconds || 900;
    const prefix = options.prefix || 'general';

    return async (req, res, next) => {
        const ip = req.ip ||'127.0.0.1';
        const key = `rl:${ip}:${prefix}`;

        try {
            if (redisClient.isOpen) {
                const count = await redisClient.incr(key);

                if (count === 1) {
                    await redisClient.expire(key, windowSeconds);
                }

                res.setHeader('RateLimit', max);
                res.setHeader('RateLimitRemainder', Math.max(0, max - count));

                if (count > max) {
                    res.setHeader('Retry-After', windowSeconds);
                    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
                }
            }
        } catch (err) {
            const logger = require('../jobs/tokenCleanupJob');
            logger.warn(`Redis unavailable — rate limiting skipped for IP ${ip} on route "${prefix}": ${err.message}`);
        }

        next();
    };
};

module.exports = rateLimiter;
