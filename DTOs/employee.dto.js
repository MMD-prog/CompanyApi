const { encodeId } = require('../Hashing/idHasher');

const formatEmployee = (employee) => {
    if (!employee) return null;
    
    const data = employee.toJSON ? employee.toJSON() : employee;

    return {
        id: encodeId(data.id),
        name: data.name,
        email: data.email,
        company_id: encodeId(data.company_id)
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
