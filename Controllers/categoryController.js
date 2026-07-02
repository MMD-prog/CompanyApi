const { Category } = require('../lib');

exports.getAll = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to fetch categories due to an unexpected system error.' 
        });
    }
};

exports.create = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(422).json({ 
                error: 'Validation failed', 
                details: err.errors.map(e => e.message) 
            });
        }

        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ 
                error: 'Data conflict', 
                message: 'A category with this name already exists.' 
            });
        }

        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to process category creation due to bad input data structure.' 
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Invalid category ID format or database restriction prevented deletion.' 
        });
    }
};