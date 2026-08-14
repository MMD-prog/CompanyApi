const LogoutToken = new Map();

const addToken = (token, exp) => {
    LogoutToken.set(token, exp);
};

const isBlacklisted = (token) => {
    return LogoutToken.has(token);
};

const removeExpiredTokens = () => {
    const now = Date.now();
    for (const [token, exp] of LogoutToken.entries()) {
        if (exp <= now) {
            LogoutToken.delete(token);
        }
    }
};

module.exports = {
    addToken,
    isBlacklisted,
    removeExpiredTokens,
    LogoutToken
};
