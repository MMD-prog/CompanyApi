const Sqids = require('sqids').default;

const sqids = new Sqids({
    minLength: 6,
});
const ENTITY_TYPES = {
    COMPANY: 1,
    EMPLOYEE: 2,
    CATEGORY: 3,
};

const encodeId = (id, entityType) => {
    if (id === null || id === undefined || isNaN(id)) return null;
    if (!entityType) return null;
    return sqids.encode([entityType, id]);
};

const decodeId = (hash, entityType) => {
    if (!hash || typeof hash !== 'string') return null;
    if (!entityType) return null;

    const numbers = sqids.decode(hash);
    if (numbers.length !== 2) return null;

    const [type, id] = numbers;
    if (type !== entityType) return null;

    return id;
};

const decodeIds = (hashes, entityType) => {
    if (!Array.isArray(hashes)) return null;

    const ids = [];
    for (const hash of hashes) {
        const id = decodeId(hash, entityType);
        if (!id) return null;
        ids.push(id);
    }

    return ids;
};

module.exports = {
    encodeId,
    decodeId,
    decodeIds,
    ENTITY_TYPES
};
