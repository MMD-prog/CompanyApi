# Company API

An entry-level Express.js REST API with MySQL/Sequelize, featuring multi-strategy authentication (JWT Bearer, API Keys, and Basic Auth), hashed IDs, validation, and soft-delete capabilities.

---

## Setup & Running Instructions

### 1. Clone the repository
```bash
git clone https://github.com/mestefan-cmd/CompanyApi.git
cd CompanyApi
```

### 2. Environment Configuration
Create a `.env` file in the root directory and fill in your database and server credentials:

```env
PORT=3000
APP_URL=http://localhost:3000

DB_HOST=localhost
DB_NAME=company_db
DB_USER=root
DB_PASS=your_password

JWT_SECRET=your_jwt_secret_key
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=password123
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Management

- **Create Database**:
  - Mac/Linux: `npx sequelize-cli db:create`
  - Windows: `npx.cmd sequelize-cli db:create`

- **Run Migrations**:
  - Mac/Linux: `npx sequelize-cli db:migrate`
  - Windows: `npx.cmd sequelize-cli db:migrate`

- **Seed Mock Data**:
  - Mac/Linux: `npx sequelize-cli db:seed:all`
  - Windows: `npx.cmd sequelize-cli db:seed:all`

- **Generate Migration**:
  - Mac/Linux: `npx sequelize-cli migration:generate --name your-migration-name`
  - Windows: `npx.cmd sequelize-cli migration:generate --name your-migration-name`

- **Generate Seeder**:
  - Mac/Linux: `npx sequelize-cli seed:generate --name your-seeder-name`
  - Windows: `npx.cmd sequelize-cli seed:generate --name your-seeder-name`

### 5. Start the Server
```bash
node server.js
```
The server will run on `http://localhost:3000` (or your configured `PORT`).

---

## Authentication Strategies

| Route Prefix | Auth Type | Required Header |
| :--- | :--- | :--- |
| `/auth` | None (Public) | None |
| `/companies` | **JWT Token** | `Authorization: Bearer <your_jwt_token>` |
| `/employees` | **API Key** | `api-key: <your_api_key>` |
| `/categories` | **Basic Auth** | `Authorization: Basic <base64(user:pass)>` |

---

## API Reference & Endpoints

### Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Log in with credentials & receive JWT token | No |
| `POST` | `/auth/logout` | Log out user session | No |

---

### Companies (`/companies`)
> **Note**: All company endpoints require **JWT Bearer Token** authentication.

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/companies` | Get a paginated list of companies | `search`, `category`, `page`, `limit` |
| `GET` | `/companies/:id` | Get details for a specific company by hashed ID | N/A |
| `POST` | `/companies` | Create a new company | N/A |
| `PUT` | `/companies/:id` | Fully update a company | N/A |
| `PATCH` | `/companies/:id` | Partially update a company | N/A |
| `DELETE` | `/companies/:id` | Soft-delete a company | N/A |
| `POST` | `/companies/:id/restore` | Restore a soft-deleted company | N/A |

---

### Employees (`/employees`)
> **Note**: All employee endpoints require an **API Key** in the `api-key` header.

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/employees` | Get a paginated list of employees | `search`, `offset`, `limit` |
| `GET` | `/employees/:id` | Get details for a specific employee by hashed ID | N/A |
| `POST` | `/employees` | Create a new employee | N/A |
| `PUT` | `/employees/:id` | Fully update an employee | N/A |
| `PATCH` | `/employees/:id` | Partially update an employee | N/A |
| `DELETE` | `/employees/:id` | Soft-delete an employee | N/A |
| `POST` | `/employees/:id/restore` | Restore a soft-deleted employee | N/A |

---

### Categories (`/categories`)
> **Note**: All category endpoints require **Basic Auth** (`Authorization: Basic ...`).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/categories` | Get all categories |
| `POST` | `/categories` | Create a new category |
| `PUT` | `/categories/:id` | Fully update a category |
| `PATCH` | `/categories/:id` | Partially update a category |
| `DELETE` | `/categories/:id` | Delete a category |