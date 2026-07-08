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
    if (numbers.length === 0) return null;
    
    if (sqids.encode(numbers) !== hash) return null;
    return numbers[0];
};

module.exports = {
    encodeId,
    decodeId
};
