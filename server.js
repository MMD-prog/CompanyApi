require('dotenv').config();
const express = require('express');
const { sequelize } = require('./lib');
const registerRoutes = require('./Routes');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swagger');

const app = express();

app.use(express.json());

app.get('/swagger.json', (req, res) => {
    res.json(swaggerOptions);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected.');
        registerRoutes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.APP_URL}`);
        });
    })
    .catch((err) => {
        console.error('Could not connect to database:', err.message);
        process.exit(1);
    });