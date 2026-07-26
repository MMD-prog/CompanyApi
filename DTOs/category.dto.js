const { encodeId, ENTITY_TYPES } = require('../Hashing/idHasher');

const formatCategory = (category) => {
    if (!category) return null;
    
    const data = category.toJSON ? category.toJSON() : category;

    return {
        id: encodeId(data.id, ENTITY_TYPES.CATEGORY),
        name: data.name
    };
};

const FormatCategories = (categories) => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.map(formatCategory);
};

module.exports = {
    formatCategory,
    FormatCategories
};
