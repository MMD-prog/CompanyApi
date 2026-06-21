require('dotenv').config();
const express = require('express');
const { sequelize } = require('./lib');
const registerRoutes = require('./Routes');

const app = express();

app.use(express.json());

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