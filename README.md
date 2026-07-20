1. Clone using bash
git clone https://github.com/mestefan-cmd/CompanyApi.git

2. create .env file and fill in your credentials

PORT=
APP_URL=

DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=

3. for installing dependencies and packages
npm install

4. to create a new db
Mac/Linux: npx sequelize-cli db:create
Windows: npx.cmd sequelize-cli db:create

5. to run the migration files
Mac/Linux: npx sequelize-cli db:migrate
Windows: npx.cmd sequelize-cli db:migrate

6. to create mock data
Mac/Linux: npx sequelize-cli db:seed:all
Windows: npx.cmd sequelize-cli db:seed:all

7. to generate a new migration file
Mac/Linux: npx sequelize-cli migration:generate --name your-migration-name
Windows: npx.cmd sequelize-cli migration:generate --name your-migration-name

8. to generate a new seeder file
Mac/Linux: npx sequelize-cli seed:generate --name your-seeder-name
Windows: npx.cmd sequelize-cli seed:generate --name your-seeder-name

9. to start the server
node server.js

Server will run on http://localhost:3000
