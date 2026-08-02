# 🔗 URL Shortener Service

A backend API service for shortening URLs, built with **Node.js**, **Express 5**, **PostgreSQL**, and **Drizzle ORM**.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express 5** | HTTP framework |
| **PostgreSQL 17** | Database (via Docker) |
| **Drizzle ORM** | Database ORM & schema management |
| **Zod 4** | Request validation |
| **JSON Web Tokens** | Authentication (planned) |
| **Docker Compose** | Database containerization |
| **pnpm** | Package manager |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v11+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

### 1. Clone & Install

```bash
cd URL_Shortner_Service
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgres://postgres:adminURL@localhost:5432/postgres
JWT_SECRET=your_jwt_secret_here
PORT=8000
```

### 3. Start the Database

```bash
docker compose up -d
```

This spins up a **PostgreSQL 17** container on port `5432` with persistent volume storage.

### 4. Push the Schema

```bash
pnpm db:push
```

### 5. Run the Server

```bash
pnpm start
```

The server starts on `http://localhost:8000` with file-watching enabled (`node --watch`).

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `pnpm start` | `node --watch index.js` | Start dev server with auto-reload |
| `pnpm db:push` | `drizzle-kit push` | Push schema changes to the database |
| `pnpm db:studio` | `drizzle-kit studio` | Open Drizzle Studio GUI |

## Project Structure

```
URL_Shortner_Service/
├── db/
│   └── index.js              # Database connection (Drizzle + PostgreSQL)
├── models/
│   ├── index.js              # Model barrel export
│   └── user.model.js         # Users table schema
├── routes/
│   └── user.route.js         # User signup endpoint
├── validations/
│   └── request.validation.js # Zod request body schemas
├── docker-compose.yml        # PostgreSQL container config
├── drizzle.config.js         # Drizzle Kit configuration
├── index.js                  # Express app entry point
├── .env                      # Environment variables
└── package.json
```

## API Endpoints

### `GET /`

Health check endpoint.

**Response:** `200 OK`
```json
"Server is running...."
```

---

### `POST /user/signup`

Register a new user account.

**Request Body:**
```json
{
  "firstname": "Shubham",
  "lastname": "Dev",
  "email": "shubhamdev@gmail.com",
  "password": "Shubham2026@gmail.com"
}
```

**Validation Rules:**
- `firstname` — required, 1–50 characters
- `lastname` — optional, max 50 characters
- `email` — required, valid email format, stored lowercase
- `password` — 8–64 characters, must contain uppercase, lowercase, and a number

**Success Response:** `201 Created`
```json
{
  "Status": "Success",
  "data": "9961e04e-2ef8-409e-a258-1f0cb6ba0c40"
}
```

**Error Responses:**

`400 Bad Request` — Validation failed:
```json
{
  "error": {
    "email": ["Invalid email"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

`400 Bad Request` — Duplicate email:
```json
{
  "error": "User with shubhamdev@gmail.com already exists"
}
```

## Database Schema

### `users` Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `uuid` | Primary Key, auto-generated |
| `first_name` | `varchar(100)` | NOT NULL |
| `last_name` | `varchar(100)` | Nullable |
| `email` | `varchar(255)` | NOT NULL, UNIQUE |
| `password` | `text` | NOT NULL (HMAC-SHA256 hashed) |
| `salt` | `text` | NOT NULL (random 256-byte hex) |
| `created_at` | `timestamp` | NOT NULL, defaults to now |
| `updated_at` | `timestamp` | Auto-updated on changes |

## Security

- Passwords are hashed using **HMAC-SHA256** with a unique random salt per user
- Salts are 256 random bytes encoded as hex
- Request bodies are validated with **Zod** using strict mode (no extra fields allowed)

## Progress

- [x] Project scaffolding (Express 5 + ESM modules)
- [x] Docker Compose setup for PostgreSQL
- [x] Drizzle ORM integration & database connection
- [x] Users table schema
- [x] User signup endpoint with validation
- [x] Password hashing with salt
- [x] Zod request validation
- [ ] User login endpoint
- [ ] JWT authentication middleware
- [ ] URL shortening endpoints (create, redirect, delete)
- [ ] URL analytics / click tracking
