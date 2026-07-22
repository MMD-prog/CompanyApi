const bcrypt = require('bcryptjs');
const { User } = require('../lib');

const basicAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ error: 'Authentication required. Please provide Basic Auth credentials.' });
        }

        const base64Token = authHeader.split(' ')[1];
        if (!base64Token) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ error: 'Malformed Authorization header.' });
        }

        const decoded = Buffer.from(base64Token, 'base64').toString('utf-8');

        const colonIndex = decoded.indexOf(':');
        if (colonIndex === -1) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ error: 'Invalid Basic Auth format. Expected "username:password".' });
        }

        const username = decoded.substring(0, colonIndex);
        const password = decoded.substring(colonIndex + 1);

        const user = await User.scope('withPassword').findOne({ where: { username } });

        if (!user) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        req.user = {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt
        };

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = basicAuth;
