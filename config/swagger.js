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
            { name: 'Auth',       description: 'Authentication endpoints' },
            { name: 'Companies',  description: 'Company endpoints' },
            { name: 'Employees',  description: 'Employee endpoints' },
            { name: 'Categories', description: 'Category endpoints' }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'API key generated in the api_keys table'
                },
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                    description: 'Basic Authentication header'
                }
            },
            responses: {
                UnauthorizedError: {
                    description: 'Authentication required or invalid credentials',
                    headers: {
                        'WWW-Authenticate': {
                            schema: {
                                type: 'string',
                                example: 'Basic realm="Secure Area"'
                            }
                        }
                    },
                    content: {
                        'application/json': {
                            example: {
                                error: 'Authentication required.'
                            }
                        }
                    }
                },
                BadRequestError: {
                    description: 'Request failed fallback',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Request Failed',
                                message: 'Unable to process request due to bad input data.'
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Not found'
                            }
                        }
                    }
                },
                ValidationError: {
                    description: 'Data values fail validation constraints',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Validation failed',
                                details: [
                                    'email must be a valid email',
                                    'name cannot be null'
                                ]
                            }
                        }
                    }
                },
                ConflictError: {
                    description: 'Unique data attribute conflict',
                    content: {
                        'application/json': {
                            example: {
                                error: 'Data conflict',
                                message: 'A record with this unique attribute already exists.'
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

const outputPath = path.join(__dirname, '../swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));