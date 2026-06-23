const { Op, Company } = require('../lib');

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
            limit:  limitNum,
            offset
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
        const company = await Company.findByPk(req.params.id);

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
        const company = await Company.create(req.body);
        res.status(201).json(company);
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

        await company.update(req.body);
        res.status(200).json(company);
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
