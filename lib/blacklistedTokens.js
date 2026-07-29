const blacklistedTokens = new Map();

const addToken = (token, exp) => {
    blacklistedTokens.set(token, exp);
};

const isBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

const removeExpiredTokens = () => {
    const now = Date.now();
    for (const [token, exp] of blacklistedTokens.entries()) {
        if (exp <= now) {
            blacklistedTokens.delete(token);
        }
    }
};

module.exports = {
    addToken,
    isBlacklisted,
    removeExpiredTokens,
    blacklistedTokens
};
