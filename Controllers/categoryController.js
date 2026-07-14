const { Category } = require('../lib');
const { formatCategory, FormatCategories } = require('../DTOs/category.dto');
const { decodeId, ENTITY_TYPES } = require('../Hashing/idHasher');

exports.getAll = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(FormatCategories(categories));
};

exports.create = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(formatCategory(category));
};

exports.patch = async (req, res) => {
    const id = decodeId(req.params.id, ENTITY_TYPES.CATEGORY);
    if (!id) return res.status(404).json({ error: 'Category not found' });

    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(req.body);
    res.status(200).json(formatCategory(category));
};

exports.update = async (req, res) => {
    const id = decodeId(req.params.id, ENTITY_TYPES.CATEGORY);
    if (!id) return res.status(404).json({ error: 'Category not found' });

    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const payload = { ...req.body };

    await category.update(payload);
    res.status(200).json(formatCategory(category));
};

exports.remove = async (req, res) => {
    const id = decodeId(req.params.id, ENTITY_TYPES.CATEGORY);
    if (!id) return res.status(404).json({ error: 'Category not found' });

    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(204).send();
};
