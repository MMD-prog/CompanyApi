# Company API

A RESTful Express.js API built with Node.js, MySQL, and Sequelize. Features multi-strategy authentication (JWT Bearer, API Keys, and Basic Auth), in-memory token revocation with scheduled cleanup, hashed entity IDs (Sqids), request validation, and soft-delete capabilities.

---

## Features

- **Multi-Strategy Authentication**:
  - JWT Bearer Authentication (for `/companies`)
  - API Key Authentication (for `/employees`)
  - Basic Authentication (for `/categories`)
  - Public Auth endpoints (`/auth/register`, `/auth/login`, `/auth/logout`)
- **Token Revocation & Scheduled Cleanup**:
  - In-memory token blacklisting on `/auth/logout` using the `LogoutToken` store.
  - Background cron job (`node-cron`) runs daily at 3:00 AM to automatically purge expired tokens.
- **Hashed Entity IDs**:
  - Public-facing IDs are obfuscated using Sqids to prevent sequential ID harvesting.
- **Data Integrity & Validation**:
  - Request body validation middleware.
  - Soft deletion and restoration support for companies and employees.
- **Interactive Documentation**:
  - OpenAPI 3.0 / Swagger UI specs automatically generated.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Scheduling**: node-cron
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `basic-auth`
- **Documentation**: Swagger UI (`swagger-jsdoc`)

---

## Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
APP_URL=http://localhost:3000

DB_HOST=127.0.0.1
DB_NAME=company_db
DB_USER=root
DB_PASS=your_password

JWT_SECRET=your_jwt_secret_key

ADMIN_USER=admin
ADMIN_PASS=password123
```

---

## Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Management Commands

| Task | Mac / Linux Command | Windows Command |
| :--- | :--- | :--- |
| Create Database | `npx sequelize-cli db:create` | `npx.cmd sequelize-cli db:create` |
| Run Migrations | `npx sequelize-cli db:migrate` | `npx.cmd sequelize-cli db:migrate` |
| Seed Mock Data | `npx sequelize-cli db:seed:all` | `npx.cmd sequelize-cli db:seed:all` |
| New Migration | `npx sequelize-cli migration:generate --name name` | `npx.cmd sequelize-cli migration:generate --name name` |
| New Seeder | `npx sequelize-cli seed:generate --name name` | `npx.cmd sequelize-cli seed:generate --name name` |

### 3. Start Server
```bash
node server.js
```
The server will run on `http://localhost:3000`.

---

## Security & Authentication Overview

| Route Prefix | Strategy | Required Header |
| :--- | :--- | :--- |
| `/auth` | None (Public) | None |
| `/companies` | JWT Bearer | `Authorization: Bearer <jwt_token>` |
| `/employees` | API Key | `api-key: <api_key>` |
| `/categories` | Basic Auth | `Authorization: Basic <base64(user:pass)>` |

### Token Revocation Flow

1. User calls `POST /auth/logout` with their Bearer token.
2. The token is stored in the in-memory `LogoutToken` blacklist along with its expiration timestamp.
3. All subsequent requests using that token are rejected by `jwtAuth` middleware with `401 Unauthorized`.
4. A background cron job runs daily at 3:00 AM (`0 3 * * *`) and removes any tokens whose expiration has passed, keeping the store clean.

---

## API Endpoints Reference

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user account | No |
| `POST` | `/auth/login` | Authenticate credentials and receive a JWT token | No |
| `POST` | `/auth/logout` | Revoke current JWT token and add to LogoutToken blacklist | No |

---

### Companies (`/companies`)
*All endpoints require `Authorization: Bearer <jwt_token>`.*

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/companies` | List companies (paginated) | `search`, `category`, `page`, `limit` |
| `GET` | `/companies/:id` | Get company by hashed ID | None |
| `POST` | `/companies` | Create a new company | None |
| `PUT` | `/companies/:id` | Fully update a company | None |
| `PATCH` | `/companies/:id` | Partially update a company | None |
| `DELETE` | `/companies/:id` | Soft-delete a company | None |
| `POST` | `/companies/:id/restore` | Restore a soft-deleted company | None |

---

### Employees (`/employees`)
*All endpoints require `api-key: <api_key>`.*

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/employees` | List employees (paginated) | `search`, `offset`, `limit` |
| `GET` | `/employees/:id` | Get employee by hashed ID | None |
| `POST` | `/employees` | Create a new employee | None |
| `PUT` | `/employees/:id` | Fully update an employee | None |
| `PATCH` | `/employees/:id` | Partially update an employee | None |
| `DELETE` | `/employees/:id` | Soft-delete an employee | None |
| `POST` | `/employees/:id/restore` | Restore a soft-deleted employee | None |

---

### Categories (`/categories`)
*All endpoints require `Authorization: Basic <base64>`.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/categories` | List all categories |
| `POST` | `/categories` | Create a new category |
| `PUT` | `/categories/:id` | Fully update a category |
| `PATCH` | `/categories/:id` | Partially update a category |
| `DELETE` | `/categories/:id` | Delete a category |