const formatCategory = (category) => {
    if (!category) return null;
    
    const data = category.toJSON ? category.toJSON() : category;

    return {
        id: data.id,
        name: data.name
    };
};

const formatCategoryArray = (categories) => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.map(formatCategory);
};

module.exports = {
    formatCategory,
    formatCategoryArray
};
