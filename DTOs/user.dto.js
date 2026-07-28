const { encodeId, ENTITY_TYPES } = require('../Hashing/idHasher');

const formatUser = (user) => {
    if (!user) return null;

    const userData = user.toJSON ? user.toJSON() : user;

    return {
        id: encodeId(userData.id, ENTITY_TYPES.USER),
        username: userData.username
    };
};

module.exports = {
    formatUser
};
