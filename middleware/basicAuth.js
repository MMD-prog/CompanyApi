const auth = require('basic-auth');

const basicAuth = (req, res, next) => {
    const basic = auth(req);

    if (
        !basic ||
        basic.name !== process.env.ADMIN_USER ||
        basic.pass !== process.env.ADMIN_PASS
    ) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ error: 'Unauthorized.' });
    }

    next();
};

module.exports = basicAuth;
