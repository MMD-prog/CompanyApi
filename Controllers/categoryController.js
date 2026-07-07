const { Category } = require('../lib');
const { formatCategory, formatCategoryArray } = require('../DTOs/category.dto');

exports.getAll = async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(formatCategoryArray(categories));
};

exports.create = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(formatCategory(category));
};

exports.patch = async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(req.body);
    res.status(200).json(formatCategory(category));
};

exports.update = async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const payload = {
        name: req.body.name !== undefined ? req.body.name : null
    };

    await category.update(payload);
    res.status(200).json(formatCategory(category));
};

exports.remove = async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    await category.destroy();
    res.status(204).send();
};
