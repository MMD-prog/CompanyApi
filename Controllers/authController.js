const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { formatUser } = require('../DTOs/user.dto');
const { addToken } = require('../lib/blacklistedTokens');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username: username.trim(),
        password: hashedPassword
    });

    res.status(201).json({
        message: 'User registered successfully.',
        user: formatUser(user)
    });
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username.trim() } });
    if (!user) {
        return res.status(422).json({ error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(422).json({ error: 'Invalid username or password.' });
    }

    const formattedUser = formatUser(user);
    
    const token = jwt.sign(
        { id: formattedUser.id, username: user.username },
        process.env.JWT_SECRET || 'supersecretjwtkey123!',
        { expiresIn: '24h' }
    );

    res.status(200).json({
        message: 'Login successful.',
        token,
        user: formattedUser
    });
};

exports.logout = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);
        const exp = decoded?.exp ? decoded.exp * 1000 : Date.now() + 24 * 60 * 60 * 1000;
        addToken(token, exp);
    }

    res.status(200).json({ message: 'Logged out successfully.' });
};
