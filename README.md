# Company API

A RESTful Express.js API built with Node.js, MySQL, and Sequelize. Features multi-strategy authentication (Basic Auth and API Keys), hashed entity IDs (Sqids), request validation, soft-delete capabilities, and OpenAPI 3.0 documentation.

---

## Master Branch Overview

The `master` branch represents the base production version of the API, containing core features:

- **Authentication Strategies**:
  - **Basic Authentication** (for `/companies` and `/categories`) using header `Authorization: Basic <base64(user:pass)>`.
  - **API Key Authentication** (for `/employees`) using header `api-key: <api_key>`.
- **Obfuscated Entity IDs**:
  - Hashed public IDs using Sqids to prevent sequential ID enumeration.
- **Database & Soft Delete**:
  - Full CRUD operations for Companies, Employees, and Categories with MySQL & Sequelize ORM.
  - Soft-delete and restoration support for companies and employees.
- **Interactive Documentation**:
  - Swagger UI / OpenAPI 3.0 documentation generated automatically.

---

## Repository Branches Guide

Below is a breakdown of all active branches in this repository and what features they contain:

### 1. `master` (Default Branch)
- Base stable release.
- Includes Basic Auth for `/companies` and `/categories`, API Key authentication for `/employees`, Sqids ID hashing, and soft-delete capabilities.

### 2. `feature/JWT`
- Adds **User Authentication & JWT Support**.
- Introduces `/auth/register`, `/auth/login`, and `/auth/logout` endpoints.
- Upgrades `/companies` endpoints to use JWT Bearer tokens (`Authorization: Bearer <jwt_token>`) instead of Basic Auth.
- Includes a centralized `resolveId` middleware to simplify controller ID decoding.

### 3. `feature/JWT-Crono-Job`
- Extends `feature/JWT` with **In-Memory Token Revocation & Background Cron Cleanup**.
- Stores revoked JWTs in an in-memory `LogoutToken` list upon user logout.
- Runs a daily background cron job at 3:00 AM (`0 3 * * *`) using `node-cron` to automatically purge expired tokens from memory.

### 4. `feature/JWT-redis-cache`
- Alternative token revocation approach extending `feature/JWT`.
- Uses **Redis cache** for storing blacklisted JWTs with automatic 24-hour TTL expiration instead of in-memory background cron cleanup.

### Other Remote Branches
- `origin/Changes`: Contains earlier refactoring and commit history updates.
- `origin/category`: Contains initial category routes and basic auth experiments.
- `origin/feature/api-keys`: Initial implementation of API key header authentication.
- `origin/feature/basic-auth`: Initial implementation of Basic Auth header authentication.
- `origin/response-codes`: Historical updates for standardized HTTP status response codes.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: `basic-auth`, API Key header validation
- **ID Encoding**: `sqids`
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

## Security & Authentication Overview (`master`)

| Route Prefix | Strategy | Required Header |
| :--- | :--- | :--- |
| `/companies` | Basic Auth | `Authorization: Basic <base64(user:pass)>` |
| `/employees` | API Key | `api-key: <api_key>` |
| `/categories` | Basic Auth | `Authorization: Basic <base64(user:pass)>` |

---

## API Endpoints Reference (`master`)

### Companies (`/companies`)
*All endpoints require `Authorization: Basic <base64(user:pass)>`.*

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
