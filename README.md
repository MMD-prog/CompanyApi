# Company API

A RESTful Express.js API built with Node.js, MySQL, Redis, and Sequelize. Features multi-strategy authentication (JWT Bearer, API Keys, and Basic Auth), distributed Redis token revocation, connection pooling, performance B-Tree indexing, Redis rate-limiting, system health monitoring, and centralized daily-rotated error logging.

---

## Branch Overview & System Architecture

| Branch Name | Primary Feature / Architecture Focus | Key Modules |
| :--- | :--- | :--- |
| **`master`** | Core RESTful API baseline | Express, MySQL, Sequelize, Swagger |
| **`Indexes+changes`** | DB B-Tree Indexing & Connection Pooling | `migrations/0011-add-performance-indexes.js`, `db.js` |
| **`feature/rate-limiting-redis`** | Redis-Backed Rate Limiting Middleware | `middleware/rateLimiter.js`, `Routes/authRoutes.js` |
| **`feature/health-check`** | System Health Check API (`GET /health`) | `Controllers/healthController.js`, `Routes/healthRoutes.js` |
| **`feature/centralized-error-logging`** | App-Wide Centralized Winston Logger & Exceptions | `lib/logger.js`, `middleware/errorHandler.js`, `server.js` |
| **`feature/JWT-Crono-Job-WinstonLog`** | Scheduled Cron Cleanup & Log Rotation | `jobs/tokenCleanupJob.js`, `lib/logoutToken.js` |

---

## Key Features & Production Enhancements

- **Distributed Redis Token Store**:
  - Revoked JWT tokens on `POST /auth/logout` are stored in Redis (`bl:<token>`) with matching expiration TTLs across server instances.
  - Seamless fallback to local in-memory store if Redis is disconnected.
- **Database B-Tree Indexing & Connection Pooling**:
  - High-performance B-Tree indexes on `employees(company_id)`, `companies(name)`, `employees(name)`, and composite index `company_categories(company_id, category_id)`.
  - Configured Sequelize connection pool limits (`max: 10`, `min: 2`, `acquire: 30000`, `idle: 10000`) to prevent DB connection exhaustion under heavy load.
- **Race-Condition-Free Redis Rate Limiting**:
  - Middleware (`middleware/rateLimiter.js`) limits request rates per IP (`rl:<ip>:<prefix>`).
  - Executes `EXPIRE` only when `count === 1` to guarantee TTL assignment and prevent permanent stuck rate limits.
  - Attaches `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` headers, returning `429 Too Many Requests` on limit breaches.
  - Includes graceful Winston logger error fallback if Redis drops out.
- **System Health Monitoring (`GET /health`)**:
  - Public endpoint returning SQL-formatted timestamp (`YYYY-MM-DD HH:mm:ss`), process uptime, memory usage (`rss` & `heapUsed` in MB), MySQL pool connection stats, and Redis connection state.
  - Returns `200 OK` when fully operational, and `503 Service Unavailable` if database/redis fails.
- **Centralized Winston Error Logging**:
  - Daily rotated log files (`logs/app-errors-%DATE%.log` and `logs/combined-%DATE%.log`) via `winston-daily-rotate-file`.
  - Global Express error middleware logging HTTP method, URL path, IP, status code, and stack trace while stripping sensitive body fields (`password`).
  - Process-level protection for `uncaughtException` and `unhandledRejection` so background failures never crash the server silently.
- **Multi-Strategy Authentication**:
  - JWT Bearer Authentication (`/companies`)
  - API Key Authentication (`/employees`)
  - Basic Authentication (`/categories`)
- **Interactive Documentation**:
  - OpenAPI 3.0 / Swagger UI specs automatically generated at `/api-docs`.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **In-Memory Store & Cache**: Redis
- **Logging & Scheduling**: Winston, `winston-daily-rotate-file`, `node-cron`
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

REDIS_URL=redis://127.0.0.1:6379

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

| Route Prefix | Strategy | Required Header | Rate Limited |
| :--- | :--- | :--- | :--- |
| `/health` | Public | None | No |
| `/auth` | Public | None | Yes (`/login`, `/register`) |
| `/companies` | JWT Bearer | `Authorization: Bearer <jwt_token>` | No |
| `/employees` | API Key | `api-key: <api_key>` | No |
| `/categories` | Basic Auth | `Authorization: Basic <base64(user:pass)>` | No |

---

## API Endpoints Reference

### System Health (`/health`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | System health check (pings DB pool, Redis, reports uptime/memory) | No |

---

### Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required | Rate Limited |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user account | No | Yes (10 req / 15m) |
| `POST` | `/auth/login` | Authenticate credentials and receive JWT | No | Yes (10 req / 15m) |
| `POST` | `/auth/logout` | Revoke JWT token and add to Redis blacklist | No | No |

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
