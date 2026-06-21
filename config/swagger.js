const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Company API',
            version: '1.0.0',
        },
        servers: [
            {
                url: process.env.APP_URL
            }
        ]
    },
    apis: ['./Routes/*.js']
};

const swaggerOptions = swaggerJsdoc(options);

module.exports = swaggerOptions;