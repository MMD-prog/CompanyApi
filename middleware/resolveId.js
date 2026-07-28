const { decodeId, decodeIds, ENTITY_TYPES } = require('../Hashing/idHasher');

const resolveId = (entityType) => (req, res, next) => {
    const id = decodeId(req.params.id, entityType);
    if (!id) {
        return res.status(404).json({ error: 'Resource not found' });
    }
    req.decodedId = id;
    next();
};

module.exports = { resolveId, ENTITY_TYPES };
