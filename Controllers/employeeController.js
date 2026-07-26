const { Op, Employee } = require('../lib');
const { formatEmployee, FormatEmployees } = require('../DTOs/employee.dto');
const { decodeId, ENTITY_TYPES } = require('../Hashing/idHasher');
const sequelize = require('../db');

exports.getAll = async (req, res) => {
    const { search, offset, limit, deleted } = req.query;

    const limitNum  = parseInt(limit)  || 10;
    const offsetNum = parseInt(offset) || 0;

    let whereClause = search ? {
        [Op.or]: [
            { name:  { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    if (deleted === 'only') {
        whereClause.deleted_at = { [Op.not]: null };
    }

    const isParanoid = !(deleted === 'true' || deleted === 'only');

    const { count, rows: employees } = await Employee.findAndCountAll({
        where: whereClause,
        limit:  limitNum,
        offset: offsetNum,
        paranoid: isParanoid
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
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.EMPLOYEE);
    if (!decodedId) return res.status(404).json({ error: 'Employee not found' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(formatEmployee(employee));
};

exports.create = async (req, res) => {
    const CreateRollback = await sequelize.transaction();

    try {
        const payload = { ...req.body };
        const employee = await Employee.create(payload, { 
            transaction: CreateRollback 
        });

        await CreateRollback.commit();

        res.status(201).json(formatEmployee(employee));
    } catch (err) {
        await CreateRollback.rollback();
        res.status(500).json({ error: 'Failed to create employee, changes have been rolled back' });
    }
};

exports.patch = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.EMPLOYEE);
    if (!decodedId) return res.status(404).json({ error: 'Employee not found' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const payload = { ...req.body };

    await employee.update(payload);
    res.status(200).json(formatEmployee(employee));
};

exports.update = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.EMPLOYEE);
    if (!decodedId) return res.status(404).json({ error: 'Employee not found' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const payload = { ...req.body };

    await employee.update(payload);
    res.status(200).json(formatEmployee(employee));
};

exports.remove = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.EMPLOYEE);
    if (!decodedId) return res.status(404).json({ error: 'Employee not found' });

    const employee = await Employee.findByPk(decodedId);

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    res.status(204).send();
};

exports.restore = async (req, res) => {
    const decodedId = decodeId(req.params.id, ENTITY_TYPES.EMPLOYEE);
    if (!decodedId) return res.status(404).json({ error: 'Employee not found' });

    const employee = await Employee.findByPk(decodedId, { paranoid: false });

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    if (employee.deleted_at === null) {
        return res.status(400).json({ error: 'Employee is not deleted' });
    }

    await employee.restore();
    res.status(200).json(formatEmployee(employee));
};
