const path = require('path');
const fs = require('fs');
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
                url: 'http://localhost:3000',
                description: 'local server'
            }
        ],
        tags: [
            { name: 'Companies', description: 'Company endpoints' },
            { name: 'Employees', description: 'Employee endpoints' }
        ],
        components: {
            responses: {
                InternalServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Internal server error'
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: 'Not found',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Not found'
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const outputPath = path.join(__dirname,'../swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));