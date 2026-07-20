1. Clone using bash
git clone <https://github.com/mestefan-cmd/CompanyApi.gitmy-repo-url>

2. create .env file and fill the credentials from .env.example

3. for installing dependencies and packages
npm install

4. to create a new db
npx sequelize-cli db:create

5. to read the migration files
npx sequelize-cli db:migrate

6. to create mock data
npx.cmd sequelize-cli db:seed:all

7. to start the server
node server.js

Server will run on `http://localhost:3000`
