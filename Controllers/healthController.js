const { sequelize } = require('../lib');
const redisClient = require('../config/redis');

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

const getSqlTimestamp = () => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

exports.getHealth = async (req, res) => {
    let dbStatus = 'disconnected';
    let dbPoolStats = { max: 10, min: 2, using: 0, idle: 0 };
    let isHealthy = true;

    try {
        await sequelize.authenticate();
        dbStatus = 'connected';
        const pool = sequelize.connectionManager?.pool;
        if (pool) {
            dbPoolStats = {
                max: pool.max || 10,
                min: pool.min || 2,
                using: pool.using || 0,
                idle: pool.idle || 0
            };
        }
    } catch (err) {
        dbStatus = 'error';
        isHealthy = false;
    }

    let redisStatus = 'disconnected';
    try {
        if (redisClient.isOpen) {
            await redisClient.ping();
            redisStatus = 'connected';
        }
    } catch (err) {
        redisStatus = 'error';
    }

    const mem = process.memoryUsage();
    const responseData = {
        status: isHealthy ? 'ok' : 'degraded',
        timestamp: getSqlTimestamp(),
        uptime: `${Math.floor(process.uptime())}s`,
        memory: {
            rss: formatBytes(mem.rss),
            heapUsed: formatBytes(mem.heapUsed)
        },
        services: {
            database: {
                status: dbStatus,
                pool: dbPoolStats
            },
            redis: {
                status: redisStatus,
                features: ['caching', 'rate-limiting']
            }
        }
    };

    const statusCode = isHealthy ? 200 : 503;
    return res.status(statusCode).json(responseData);
};
