const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const { isBlacklisted } = require('../lib/logoutToken');
=======
const { isBlacklisted } = require('../lib/blacklistedTokens');
>>>>>>> d6dc4be95747c05011386b99e19da3459c148acb

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
