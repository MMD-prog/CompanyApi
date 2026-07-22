const auth = require('basic-auth');

const basicAuth = (req, res, next) => {
    const credentials = auth(req);

    if (
        !credentials ||
        credentials.name !== process.env.ADMIN_USER ||
        credentials.pass !== process.env.ADMIN_PASS
    ) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ error: 'Unauthorized.' });
    }

    next();
};

module.exports = basicAuth;
