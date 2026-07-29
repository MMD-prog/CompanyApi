const jwt = require('jsonwebtoken');
const { isBlacklisted } = require('../lib/blacklistedTokens');

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Token missing or invalid format.' });
    }

    const token = authHeader.split(' ')[1];

    if (isBlacklisted(token)) {
        return res.status(401).json({ error: 'Unauthorized. Token has been revoked.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey123!');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
    }
};

module.exports = jwtAuth;
