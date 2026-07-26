const { encodeId, ENTITY_TYPES } = require('../Hashing/idHasher');

const formatEmployee = (employee) => {
    if (!employee) return null;
    
    const data = employee.toJSON ? employee.toJSON() : employee;

    return {
        id: encodeId(data.id, ENTITY_TYPES.EMPLOYEE),
        name: data.name,
        email: data.email,
        company_id: encodeId(data.company_id, ENTITY_TYPES.COMPANY)
    };
};

const FormatEmployees = (employees) => {
    if (!employees || !Array.isArray(employees)) return [];
    return employees.map(formatEmployee);
};

module.exports = {
    formatEmployee,
    FormatEmployees
};
