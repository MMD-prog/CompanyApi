require('dotenv').config();
require('./config/swagger');
require('./config/redis');
require('./jobs/tokenCleanupJob');
const express = require('express');
const { sequelize } = require('./lib');
const registerRoutes = require('./Routes');

const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => {
        console.log('Database connected.');
        registerRoutes(app);
        app.use(require('./middleware/errorHandler').errorHandler);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.APP_URL}`);
        });
    })
    .catch((err) => {
        console.error('Could not connect to database:', err.message);
        process.exit(1);
    });