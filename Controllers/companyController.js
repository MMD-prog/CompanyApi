const { Op, Company, Category } = require('../lib');

exports.getAll = async (req, res) => {
    try {
        const { search, page, limit } = req.query;

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
            include: [{ model: Category, through: { attributes: [] } }],
            limit:  limitNum,
            offset,
            distinct: true
        });

        if (search && companies.length === 0) {
            return res.status(404).json({ error: 'No companies found matching your search' });
        }

        res.status(200).json({
            total:      count,
            page:       pageNum,
            totalPages: Math.ceil(count / limitNum),
            data:       companies
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { categoryIds, ...companyData } = req.body;
        const company = await Company.create(companyData);

        if (categoryIds && categoryIds.length > 0) {
            await company.setCategories(categoryIds);
        }

        const result = await Company.findByPk(company.id, {
            include: [{ model: Category, through: { attributes: [] } }]
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

        const result = await Company.findByPk(company.id, {
            include: [{ model: Category, through: { attributes: [] } }]
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
};
