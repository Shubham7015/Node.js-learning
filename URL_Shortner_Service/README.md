# 🔗 URL Shortener Service

A backend API service for shortening URLs, built with **Node.js**, **Express 5**, **PostgreSQL**, and **Drizzle ORM**. Features JWT-based authentication, full CRUD operations on shortened URLs, and request validation with Zod.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime |
| **Express 5** | HTTP framework |
| **PostgreSQL 17** | Database (via Docker) |
| **Drizzle ORM** | Database ORM & schema management |
| **Zod 4** | Request validation |
| **JSON Web Tokens** | Authentication |
| **nanoid** | Short code generation |
| **Docker Compose** | Database containerization |
| **pnpm** | Package manager |

## Prerequisites

- [Node.js](https://nodejs.org/) (v22+)
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
│   └── index.js                # Database connection (Drizzle + PostgreSQL)
├── middlewares/
│   └── auth.middleware.js      # JWT auth middleware & route guard
├── models/
│   ├── index.js                # Model barrel export
│   ├── url.model.js            # URLs table schema
│   └── user.model.js           # Users table schema
├── routes/
│   ├── url.route.js            # URL shortening endpoints
│   └── user.route.js           # User signup & login endpoints
├── services/
│   ├── url.service.js          # URL database operations
│   └── user.service.js         # User database operations
├── utils/
│   └── token.js                # JWT token creation & validation
├── validations/
│   ├── request.validation.js   # Zod request body schemas
│   └── token.validation.js     # Zod token payload schemas
├── docker-compose.yml          # PostgreSQL container config
├── drizzle.config.js           # Drizzle Kit configuration
├── index.js                    # Express app entry point
├── .env                        # Environment variables
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

### Authentication

#### `POST /user/signup`

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

#### `POST /user/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "shubhamdev@gmail.com",
  "password": "Shubham2026@gmail.com"
}
```

**Success Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### URL Shortening (Requires Authentication)

All URL endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

#### `POST /shorten`

Create a shortened URL.

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url",
  "code": "my-link"
}
```

- `url` — required, must be a valid URL
- `code` — optional custom short code (auto-generated via nanoid if omitted)

**Success Response:** `201 Created`
```json
{
  "id": "a1b2c3d4-...",
  "shortCode": "my-link",
  "targetUrl": "https://example.com/very/long/url"
}
```

#### `GET /codes`

List all shortened URLs owned by the authenticated user.

**Success Response:** `200 OK`
```json
{
  "codes": [
    {
      "id": "a1b2c3d4-...",
      "shortCode": "my-link",
      "targetUrl": "https://example.com/very/long/url",
      "userId": "...",
      "createdAt": "2026-08-04T06:00:00.000Z",
      "updatedAt": null
    }
  ]
}
```

#### `PATCH /:id`

Update a shortened URL. At least one of `url` or `code` must be provided.

**Request Body:**
```json
{
  "url": "https://example.com/new-destination",
  "code": "new-code"
}
```

- `url` — optional, new destination URL
- `code` — optional, new custom short code

**Success Response:** `200 OK`
```json
{
  "message": "successfully updated"
}
```

**Error Response:** `404 Not Found` — URL doesn't exist or doesn't belong to user.

#### `DELETE /:id`

Delete a shortened URL owned by the authenticated user.

**Success Response:** `200 OK`
```json
{
  "message": "successfully deleted"
}
```

#### `GET /:shortcode`

Redirect to the original URL (public, no authentication required).

**Response:** `302 Redirect` to the target URL.

---

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

### `urls` Table

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `uuid` | Primary Key, auto-generated |
| `code` | `varchar(255)` | NOT NULL, UNIQUE |
| `target_url` | `text` | NOT NULL |
| `user_id` | `uuid` | NOT NULL, FK → `users.id` |
| `created_at` | `timestamp` | NOT NULL, defaults to now |
| `updated_at` | `timestamp` | Auto-updated on changes |

## Security

- Passwords are hashed using **HMAC-SHA256** with a unique random salt per user
- Salts are 256 random bytes encoded as hex
- JWT-based authentication — tokens are verified on every protected request
- Request bodies are validated with **Zod** using strict mode (no extra fields allowed)
- Authorization header is validated for proper `Bearer <token>` format

## Middlewares

| Middleware | Scope | Purpose |
|---|---|---|
| `authenticationMiddleware` | Global | Parses `Authorization: Bearer <token>`, verifies JWT, attaches payload to `req.user` |
| `authValidator` | Route-level | Returns `401` if `req.user` is not set (guards protected routes) |

## Progress

- [x] Project scaffolding (Express 5 + ESM modules)
- [x] Docker Compose setup for PostgreSQL
- [x] Drizzle ORM integration & database connection
- [x] Users table schema
- [x] User signup endpoint with validation
- [x] Password hashing with salt
- [x] Zod request validation
- [x] User login endpoint
- [x] JWT authentication middleware
- [x] URLs table schema
- [x] URL shortening (POST /shorten)
- [x] URL redirect (GET /:shortcode)
- [x] List user URLs (GET /codes)
- [x] Update URL (PATCH /:id)
- [x] Delete URL (DELETE /:id)
- [ ] URL analytics / click tracking
