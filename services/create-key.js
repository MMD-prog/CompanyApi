require('dotenv').config();
const { createApiKey, sequelize } = require('../lib');

async function main() {
    const name = process.argv.slice(2).join(' ').trim();

    if (!name) {
        process.exit(1);
    }

    try {
        const apiKey = await createApiKey(name);
        console.log(`\nCreated API key for "${apiKey.name}":\n${apiKey.key}\n`);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            console.error(`\nError: An API key with the name "${name}" already exists.\n`);
        }
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

main();
