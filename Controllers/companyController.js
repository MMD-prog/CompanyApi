const { Op, Company, Category } = require('../lib');
const { formatCompany, FormatCompanies } = require('../DTOs/company.dto');
const { decodeId, decodeIds, ENTITY_TYPES } = require('../Hashing/idHasher');

exports.getAll = async (req, res, next) => {
    try {
        const { search, category, page, limit, deleted } = req.query;

        const pageNum  = parseInt(page)  || 1;
        const limitNum = parseInt(limit) || 10;
        const offset   = (pageNum - 1) * limitNum;

        const decodedCategoryId = category ? decodeId(category, ENTITY_TYPES.CATEGORY) : null;
        if (category && !decodedCategoryId) {
            return res.status(404).json({ error: 'Company not found' });
        }

        let ParamsQueries = search ? {
            [Op.or]: [
                { name:    { [Op.like]: `%${search}%` } },
                { email:   { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } }
            ]
        } : {};

        if (deleted === 'only') {
            ParamsQueries.deleted_at = { [Op.not]: null };
        }

        const isParanoid = !(deleted === 'true' || deleted === 'only');

        const { count, rows: companies } = await Company.findAndCountAll({
            where: ParamsQueries,
            include: [{
                model: Category,
                through: { attributes: [] },
                ...(decodedCategoryId ? { where: { id: decodedCategoryId } } : {})
            }],
            limit:  limitNum,
            offset,
            distinct: true,
            paranoid: isParanoid
        });

        if ((search || category) && companies.length === 0) {
            return res.status(404).json({ error: 'No companies found matching your search' });
        }

        res.status(200).json({
            total:      count,
            page:       pageNum,
            totalPages: Math.ceil(count / limitNum),
            data:       FormatCompanies(companies)
        });
    } catch (error) {
        const { page, limit } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        if (
            (page !== undefined && (isNaN(pageNum) || pageNum < 1)) ||
            (limit !== undefined && (isNaN(limitNum) || limitNum < 1))
        ) {
            return res.status(400).json({ error: 'Bad syntax for pagination' });
        }

        next(error);
    }
};

exports.getById = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.COMPANY);
    if (!decodedId) return res.status(404).json({ error: 'Company not found' });

    const company = await Company.findByPk(decodedId, {
        include: [{ model: Category, through: { attributes: [] } }]
    });

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(formatCompany(company));
};

exports.create = async (req, res) => {
    const { categoryIds, ...companyData } = req.body;
    const company = await Company.create(companyData);

    if (categoryIds && categoryIds.length > 0) {
        const decodedCategoryIds = decodeIds(categoryIds, ENTITY_TYPES.CATEGORY);
        if (!decodedCategoryIds) return res.status(404).json({ error: 'Company not found' });

        await company.setCategories(decodedCategoryIds);
    }
    
    company.dataValues.Categories = await company.getCategories({ joinTableAttributes: [] });

    res.status(201).json(formatCompany(company));
};

exports.patch = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.COMPANY);
    if (!decodedId) return res.status(404).json({ error: 'Company not found' });

    const company = await Company.findByPk(decodedId);

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    const { categoryIds, ...companyData } = req.body;
    await company.update(companyData);

    if (categoryIds !== undefined) {
        const decodedCategoryIds = decodeIds(categoryIds, ENTITY_TYPES.CATEGORY);
        if (!decodedCategoryIds) return res.status(404).json({ error: 'Company not found' });

        await company.setCategories(decodedCategoryIds);
    }

    company.dataValues.Categories = await company.getCategories({ joinTableAttributes: [] });

    res.status(200).json(formatCompany(company));
};

exports.update = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.COMPANY);
    if (!decodedId) return res.status(404).json({ error: 'Company not found' });

    const company = await Company.findByPk(decodedId);

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    const { categoryIds, ...companyData } = req.body;
    await company.update(companyData);

    if (categoryIds !== undefined) {
        const decodedCategoryIds = decodeIds(categoryIds, ENTITY_TYPES.CATEGORY);
        if (!decodedCategoryIds) return res.status(404).json({ error: 'Company not found' });

        await company.setCategories(decodedCategoryIds);
    } else {
        await company.setCategories([]);
    }

    company.dataValues.Categories = await company.getCategories({ joinTableAttributes: [] });

    res.status(200).json(formatCompany(company));
};

exports.remove = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.COMPANY);
    if (!decodedId) return res.status(404).json({ error: 'Company not found' });

    const company = await Company.findByPk(decodedId);

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    await company.destroy();
    res.status(204).send();
};

exports.restore = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.COMPANY);
    if (!decodedId) return res.status(404).json({ error: 'Company not found' });

    const company = await Company.findByPk(decodedId, { paranoid: false });

    if (!company) {
        return res.status(404).json({ error: 'Company not found' });
    }

    if (company.deleted_at === null) {
        return res.status(400).json({ error: 'Company is not deleted' });
    }

    await company.restore();
    res.status(200).json(formatCompany(company));
};
