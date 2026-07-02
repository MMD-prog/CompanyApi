const { Op, Employee } = require('../lib');

exports.getAll = async (req, res) => {
    try {
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
            data:   employees
        });

    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to fetch employees due to an unexpected system error.' 
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Invalid employee ID format provided.' 
        });
    }
};

exports.create = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
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
                message: 'An employee with this unique record already exists.' 
            });
        }

        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Unable to process employee creation due to bad input data structure.' 
        });
    }
};

exports.update = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employee.update(req.body);
        res.status(200).json(employee);
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
            message: 'Unable to process employee update due to bad input formatting.' 
        });
    }
};

exports.remove = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        await employee.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ 
            error: 'Request Failed', 
            message: 'Invalid employee ID format or database restriction prevented deletion.' 
        });
    }
};