const { ApiKey } = require('../lib');

const apiKeyAuth = async (req, res, next) => {
    let key =req.headers['api-key'];


    if (!key) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    key = String(key).trim();

    const apiKey = await ApiKey.findOne({ where: { key } });

    if (!apiKey) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

module.exports = apiKeyAuth;
