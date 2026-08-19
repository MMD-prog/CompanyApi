const { logError } = require('../lib/logger');

const errorContext = (options) => {
    return (req, res, next) => {
        res.locals.errorContext = options;
        next();
    };
};

const errorHandler = (err, req, res, next) => {
    logError(err, req);

    const context = res.locals.errorContext || {};

    if (err.name === 'SequelizeValidationError') {
        return res.status(422).json({
            error: 'Validation failure',
            details: err.errors.map(e => e.message)
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Data already exists',
            message: context.uniqueMessage || 'A database conflict occurred.'
        });
    }

    const statusCode = err.status || err.statusCode || 400;
    return res.status(statusCode).json({
        error: 'Bad Syntax',
        message: context.fallbackMessage || err.message || 'An unexpected error occurred.'
    });
};

module.exports = {
    errorContext,
    errorHandler
};
