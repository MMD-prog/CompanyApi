const { Op, Company, Category } = require('../lib');

exports.getAll = async (req, res) => {
    try {
        const { search, category, page, limit } = req.query;

        const pageNum  = parseInt(page)  || 1;
        const limitNum = parseInt(limit) || 10;
        const offset   = (pageNum - 1) * limitNum;

        const { count, rows: companies } = await Company.findAndCountAll({
            where: search ? {
                [Op.or]: [
                    { name:    { [Op.like]: `%${search}%` } },
                    { email:   { [Op.like]: `%${search}%` } },
                    { address: { [Op.like]: `%${search}%` } }
                ]
            } : {},
            include: [{
                model: Category,
                through: { attributes: [] },
                ...(category ? { where: { name: { [Op.like]: `%${category}%` } } } : {})
            }],
            limit:  limitNum,
            offset,
            distinct: true
        });

        if ((search || category) && companies.length === 0) {
            return res.status(404).json({ error: 'No companies found matching your search' });
        }

        res.status(200).json({
            total:      count,
            page:       pageNum,
            totalPages: Math.ceil(count / limitNum),
            data:       companies
        });

    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to fetch companies due to invalid query parameters.' 
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id, {
            include: [{ model: Category, through: { attributes: [] } }]
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(company);
        
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Invalid company ID format provided.' 
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { categoryIds, ...companyData } = req.body;
        const company = await Company.create(companyData);

        if (categoryIds && categoryIds.length > 0) {
            await company.setCategories(categoryIds);
        }

        company.dataValues.Categories = await company.getCategories({ joinTableAttributes: [] });

        res.status(201).json(company);
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
                message: 'A company with this unique record already exists.' 
            });
        }

        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to process company creation due to bad input data structure.' 
        });
    }
};

exports.update = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const { categoryIds, ...companyData } = req.body;
        await company.update(companyData);

        if (categoryIds !== undefined) {
            await company.setCategories(categoryIds);
        }

        company.dataValues.Categories = await company.getCategories({ joinTableAttributes: [] });

        res.status(200).json(company);
        
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
                message: 'This update conflicts with an existing unique record.' 
            });
        }

        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to process company update due to bad input formatting.' 
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.id);

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        await company.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Invalid company ID format or database restriction prevented deletion.' 
        });
    }
};