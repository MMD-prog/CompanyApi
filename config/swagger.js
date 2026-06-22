const path = require('path');
const YAML = require('yamljs');

const swaggerOptions = YAML.load(path.join(__dirname, 'swagger.yaml'));

module.exports = swaggerOptions;
