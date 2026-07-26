const { encodeId, ENTITY_TYPES } = require('../Hashing/idHasher');
const { formatCategory } = require('./category.dto');

const formatCompany = (company) => {
    if (!company) return null;

    const companyData = company.toJSON ? company.toJSON() : company;

    return {
        id: encodeId(companyData.id, ENTITY_TYPES.COMPANY),
        name: companyData.name,
        email: companyData.email,
        address: companyData.address,
        category: companyData.Categories 
            ? companyData.Categories.map(formatCategory) 
            : []
    };
};

const FormatCompanies = (companies) => {
    if (!companies || !Array.isArray(companies)) return [];
    return companies.map(formatCompany);
};

module.exports = {
    formatCompany,
    FormatCompanies
};
