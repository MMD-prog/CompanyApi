const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z0-9\s]+$/;

exports.validateCompany = (req, res, next) => {
    const { name, email, address, categoryIds } = req.body;
    
    const isRequired = req.method === 'POST' || req.method === 'PUT';

    if (isRequired && !name) return res.status(422).json({ error: 'Name is required' });
    if (name !== undefined) {
        if (typeof name !== 'string') return res.status(422).json({ error: 'Name must be a string' });
        if (name.trim().length === 0) return res.status(422).json({ error: 'Name cannot be empty' });
        if (!nameRegex.test(name)) return res.status(422).json({ error: 'Name can only contain letters and numbers' });
    }

    if (email !== undefined) {
        if (typeof email !== 'string') return res.status(422).json({ error: 'Email must be a string' });
        if (!emailRegex.test(email)) return res.status(422).json({ error: 'Email format is invalid' });
    }

    if (address !== undefined) {
        if (typeof address !== 'string') return res.status(422).json({ error: 'Address must be a string' });
        if (address.trim().length === 0) return res.status(422).json({ error: 'Address cannot be empty' });
    }

    if (categoryIds !== undefined && !Array.isArray(categoryIds)) {
        return res.status(422).json({ error: 'categoryIds must be an array' });
    }

    if (typeof name === 'string') req.body.name = name.trim();
    if (typeof email === 'string') req.body.email = email.trim();
    if (typeof address === 'string') req.body.address = address.trim();

    next();
};

exports.validateEmployee = (req, res, next) => {
    const { name, email, company_id } = req.body;
    const isRequired = req.method === 'POST' || req.method === 'PUT';

    if (isRequired && !name) return res.status(422).json({ error: 'Name is required' });
    if (name !== undefined) {
        if (typeof name !== 'string') return res.status(422).json({ error: 'Name must be a string' });
        if (name.trim().length === 0) return res.status(422).json({ error: 'Name cannot be empty' });
        if (!nameRegex.test(name)) return res.status(422).json({ error: 'Name can only contain letters and numbers' });
    }
    
    if (email !== undefined) {
        if (typeof email !== 'string') return res.status(422).json({ error: 'Email must be a string' });
        if (!emailRegex.test(email)) return res.status(422).json({ error: 'Email format is invalid' });
    }

    if (company_id !== undefined && typeof company_id !== 'string') {
        return res.status(422).json({ error: 'company_id must be a string' });
    }

    if (typeof name === 'string') req.body.name = name.trim();
    if (typeof email === 'string') req.body.email = email.trim();

    next();
};

exports.validateCategory = (req, res, next) => {
    const { name } = req.body;
    const isRequired = req.method === 'POST' || req.method === 'PUT';

    if (isRequired && !name) return res.status(422).json({ error: 'Name is required' });
    if (name !== undefined) {
        if (typeof name !== 'string') return res.status(422).json({ error: 'Name must be a string' });
        if (name.trim().length === 0) return res.status(422).json({ error: 'Name cannot be empty' });
        if (!nameRegex.test(name)) return res.status(422).json({ error: 'Name can only contain letters and numbers' });
    }

    if (typeof name === 'string') req.body.name = name.trim();

    next();
};
