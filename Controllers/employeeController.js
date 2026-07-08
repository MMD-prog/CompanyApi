const { Op, Employee } = require('../lib');
const { formatEmployee, FormatEmployees } = require('../DTOs/employee.dto');
const { decodeId } = require('../Hashing/idHasher');

exports.getAll = async (req, res) => {
    const { search, offset, limit } = req.query;

    const limitNum  = parseInt(limit)  || 10;
    const offsetNum = parseInt(offset) || 0;

    const { count, rows: employees } = await Employee.findAndCountAll({
        where: search ? {
            [Op.or]: [
                { name:  { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ]
        } : {},
        limit:  limitNum,
        offset: offsetNum
    });

    if (search && employees.length === 0) {
        return res.status(404).json({ error: 'No employees found matching your search' });
    }

    res.status(200).json({
        total:  count,
        offset: offsetNum,
        limit:  limitNum,
        data:   FormatEmployees(employees)
    });
};

exports.getById = async (req, res) => {
    const decodedId = decodeId(req.params.id);
    if (!decodedId) return res.status(404).json({ error: 'ID not found' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(formatEmployee(employee));
};

exports.create = async (req, res) => {
    const payload = { ...req.body };
    const employee = await Employee.create(payload);
    res.status(201).json(formatEmployee(employee));
};

exports.patch = async (req, res) => {
    const decodedId = decodeId(req.params.id);
    if (!decodedId) return res.status(404).json({ error: 'Invalid ID format' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const payload = { ...req.body };

    await employee.update(payload);
    res.status(200).json(formatEmployee(employee));
};

exports.update = async (req, res) => {
    const decodedId = decodeId(req.params.id);
    if (!decodedId) return res.status(404).json({ error: 'Invalid ID format' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const payload = {
        name: req.body.name !== undefined ? req.body.name : null,
        email: req.body.email !== undefined ? req.body.email : null,
        company_id: req.body.company_id !== undefined ? req.body.company_id : null
    };

    await employee.update(payload);
    res.status(200).json(formatEmployee(employee));
};

exports.remove = async (req, res) => {
    const decodedId = decodeId(req.params.id);
    if (!decodedId) return res.status(404).json({ error: 'Invalid ID format' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    res.status(204).send();
};
