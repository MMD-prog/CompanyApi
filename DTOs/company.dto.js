    const formatCategory = (category) => {
        if (!category) return null;
        return {
            id: category.id,
            name: category.name
        };
    };

    const formatCompany = (company) => {
        if (!company) return null;

        const companyData = company.toJSON ? company.toJSON() : company;

        return {
            id: companyData.id,
            name: companyData.name,
            email: companyData.email,
            address: companyData.address,
            category: companyData.Categories 
                ? companyData.Categories.map(formatCategory) 
                : []
        };
    };

    module.exports = {
        formatCompany
    };
