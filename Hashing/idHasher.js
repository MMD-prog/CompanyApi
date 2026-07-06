const Sqids = require('sqids').default;

const sqids = new Sqids({
    minLength: 6,
});

const encodeId = (id) => {
    if (id === null || id === undefined || isNaN(id)) return null;
    return sqids.encode([id]);
};

const decodeId = (hash) => {
    if (!hash || typeof hash !== 'string') return null;
    const numbers = sqids.decode(hash);
    return numbers.length > 0 ? numbers[0] : null;
};

module.exports = {
    encodeId,
    decodeId
};
