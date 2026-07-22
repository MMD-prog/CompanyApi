const bcrypt = require('bcryptjs');
const { User } = require('../lib');

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.me = async (req, res) => {
    return res.status(200).json({
        message: 'Authentication successful',
        user: req.user
    });
};
