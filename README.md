# 📚 Node.js Learning

A hands-on, module-by-module journey through **Node.js** — from core fundamentals like the file system and events, all the way to building REST APIs with Express, integrating databases (PostgreSQL via Drizzle ORM & MongoDB via Mongoose), and implementing authentication with sessions and JWT.

---

## 🗂️ Repository Structure

```
Node.js/
├── module-1/              # File System (fs) — sync & async operations
├── module-2/              # Events & Buffers
│   ├── 01_events/         # EventEmitter, custom classes, error events, Chat Room
│   └── 02_buffers/        # Buffer creation, encoding, manipulation
├── module-3/              # HTTP Servers (built-in `http` module)
│   ├── Http-1/            # Basic HTTP server
│   ├── Http-2/            # URL-based routing
│   └── http-3/            # Method + URL routing with request logging
├── Module-4/              # Express.js
│   ├── 01_express/        # Express basics — routes & methods
│   └── BookStoreProject/  # Full REST API with middleware, Drizzle ORM & PostgreSQL
├── MODULES/               # CommonJS module system (require / exports)
├── Authentication-01/     # Token-based auth (in-memory, no DB)
├── AUTHENTICATION-SESSION/# JWT auth with role-based access, Drizzle ORM & PostgreSQL
├── ExpressWithTypeScript/ # Express 5 + TypeScript — Pets API with MVC architecture
├── NODE-ORM-1/            # Drizzle ORM basics with PostgreSQL
├── MongoDB/               # MongoDB + Mongoose — User Auth API with JWT
└── URL_Shortner_Service/  # URL Shortener — JWT auth, CRUD, nanoid, Zod validation
```

---

## 📖 Module Breakdown

### `module-1` — File System (`fs`)

| File | What It Covers |
|------|---------------|
| `index.js` | `readFileSync`, `writeFileSync`, `appendFileSync`, `mkdirSync` (recursive), `rmdirSync`, `unlinkSync` |
| `script.js` | Sync vs Async file reading (`readFileSync` vs `readFile`) — blocking vs non-blocking I/O |
| `notes.txt` | Quick reference on `exports`, `require`, `module`, `__filename`, `__dirname` |

**Key concepts:** Synchronous & asynchronous file I/O, creating/deleting files and directories.

---

### `module-2` — Events & Buffers

#### `01_events/`

| File | What It Covers |
|------|---------------|
| `myEvents.js` | `EventEmitter` — `.on()`, `.once()`, `.emit()`, `.removeListener()`, `.listeners()`, `.listenerCount()` |
| `myEventsClass.js` | Creating custom classes that extend `EventEmitter` |
| `myErrorEvents.js` | Handling the `error` event gracefully |
| `Chat_Room/` | A mini Chat Room project using events — practical real-world use case |

#### `02_buffers/`

| File | What It Covers |
|------|---------------|
| `index.js` | `Buffer.alloc()`, `Buffer.allocUnsafe()`, `Buffer.from()`, `.write()`, `.toString()` with multiple encodings (utf-8, base64, hex, latin1, etc.), `Buffer.concat()` |

**Key concepts:** Event-driven architecture, EventEmitter API, custom event classes, binary data handling with Buffers.

---

### `module-3` — HTTP Servers

| Sub-folder | What It Covers |
|-----------|---------------|
| `Http-1/` | Creating a basic HTTP server with `http.createServer()` |
| `Http-2/` | URL-based routing using a `switch` statement on `req.url` |
| `http-3/` | Full method + URL routing (`GET`/`POST`), request logging to `log.txt` using `fs.appendFileSync` |

**Key concepts:** Node.js built-in `http` module, request/response lifecycle, routing, status codes, request logging.

---

### `Module-4` — Express.js

#### `01_express/`

Introduction to Express.js — setting up an app, defining `GET` and `POST` routes, status codes.

#### `BookStoreProject/`

A full **Book Store REST API** built with a proper project structure:

- **Routing** — Separate route files for books (`/api/books`) and authors (`/api/authors`)
- **Controllers** — Business logic separated from routes
- **Middlewares** — Custom logger middleware
- **Models** — Database schema with Drizzle ORM
- **Views** — Server-side view layer
- **Database** — PostgreSQL with Drizzle ORM, Docker Compose for DB setup

**Tech stack:** Express 5, Drizzle ORM, PostgreSQL, dotenv, Docker.

---

### `MODULES` — CommonJS Module System

| File | What It Covers |
|------|---------------|
| `functions.js` | Named exports (`exports.add`, `exports.sub`, etc.) and default export (`module.exports`) |
| `index.js` | Importing with `require()` — destructured imports vs default imports |

**Key concepts:** `module.exports` vs `exports`, named vs default exports in CommonJS.

---

### `Authentication-01` — Basic Token Auth (In-Memory)

A simple Express server demonstrating authentication basics **without a database**:

- `POST /signup` — Register with name, email, password → receive a token (timestamp-based)
- `POST /me` — Retrieve user data using a token
- `POST /private-data` — Access protected data with token validation
- Email uniqueness enforced via a `Set`

**Tech stack:** Express 5 (ESM imports).

---

### `AUTHENTICATION-SESSION` — JWT Auth with Role-Based Access Control

A production-style authentication system with JWT tokens and role-based authorization:

```
AUTHENTICATION-SESSION/
├── db/
│   ├── index.js          # PostgreSQL connection pool (Drizzle + pg)
│   └── schema.js         # Users table (with role enum) & sessions table
├── drizzle/              # Migration files
├── middlewares/
│   └── auth.middleware.js # JWT auth, ensureAuthenticated, restrictToRole
├── routes/
│   ├── user.routes.js    # Sign-up, login, get/update profile
│   └── admin.routes.js   # Admin-only: list all users
├── docker-compose.yml
├── drizzle.config.js
└── index.js              # App entry point with global JWT middleware
```

#### Auth Flow

1. **`POST /user/sign-up`** — Register with name, email, password (hashed with HMAC-SHA256 + random salt)
2. **`POST /user/login`** — Authenticate → receive a JWT token containing `id`, `name`, `role`, `email`
3. **`GET /user`** — Get profile (requires JWT via `ensureAuthenticated` middleware)
4. **`PATCH /user`** — Update name (requires JWT)
5. **`GET /admin`** — List all users (requires JWT + authenticated user)

#### Middlewares

| Middleware | Purpose |
|---|---|
| `authenticationMiddleware` | Global — parses `Authorization: Bearer <token>`, attaches decoded payload to `req.user` |
| `ensureAuthenticated` | Route-level — returns 401 if `req.user` is not set |
| `restrictToRole(role)` | Route-level — returns 401 if user's role doesn't match |

#### Database Schema

- **`users`** — `id` (UUID), `name`, `email` (unique), `role` (USER/ADMIN enum), `password`, `salt`
- **`user_sessions`** — `id` (UUID), `userId` (FK → users), `createdAt`

**Tech stack:** Express 5, Drizzle ORM, PostgreSQL 17, JWT, Docker, pnpm.

---

### `ExpressWithTypeScript` — Pets API (Express 5 + TypeScript)

A RESTful Pets API with a clean MVC-style architecture, fully typed with TypeScript:

```
ExpressWithTypeScript/
├── src/
│   ├── controllers/pet.controller.ts    # getpets, getpetbyid handlers
│   ├── db/pets.ts                       # In-memory pet data & type definitions
│   ├── middlewares/pets.middleware.ts   # validateNumberById, validateAuthentication
│   ├── routes/pets.route.ts            # Route definitions for /pets
│   └── index.ts                        # App entry point
├── package.json
└── tsconfig.json
```

- **`GET /pets`** — List pets with chainable filters: `species`, `adopted`, `minAge`, `maxAge`
- **`GET /pets/:id?password=please`** — Get pet by ID (requires password query param + numeric ID validation)
- **404 catch-all** for unknown routes

**Tech stack:** Express 5, TypeScript 7, Node 24+, CORS.

---

### `NODE-ORM-1` — Drizzle ORM Basics

A standalone project to learn Drizzle ORM fundamentals:

- Connecting to PostgreSQL
- Defining schemas
- Querying data (`db.select().from()`)
- Inserting records (`db.insert().values()`)
- Docker Compose for PostgreSQL setup

**Tech stack:** Drizzle ORM, Drizzle Kit, PostgreSQL, dotenv, Docker.

---

### `MongoDB` — User Authentication API (MongoDB + Mongoose)

A RESTful authentication API using **MongoDB** with **Mongoose** as the ODM:

```
MongoDB/
├── index.js                    # App entry point — Express server setup
├── connection.js               # MongoDB connection helper (Mongoose)
├── models/
│   └── user.model.js           # User schema (name, email, password, salt)
├── routes/
│   └── user.route.js           # User routes — signup, login, update profile
└── middlewares/
    └── auth.middleware.js      # JWT auth middleware & route guard
```

#### Auth Flow

1. **`POST /user/signup`** — Register with name, email, password (hashed with HMAC-SHA256 + random salt)
2. **`POST /user/login`** — Authenticate → receive a JWT token
3. **`PATCH /user`** — Update name (requires JWT via `ensureAuthenticated` middleware)

#### Middlewares

| Middleware | Purpose |
|---|---|
| `authValidation` | Global — parses `Authorization: Bearer <token>`, attaches decoded payload to `req.user` |
| `ensureAuthenticated` | Route-level — returns 401 if `req.user` is not set |

**Tech stack:** Express 5, Mongoose 9, JWT, dotenv, pnpm.

---

### `URL_Shortner_Service` — URL Shortener API

A full-featured **URL Shortener** REST API with JWT authentication and complete CRUD operations:

```
URL_Shortner_Service/
├── db/
│   └── index.js                # Database connection (Drizzle + PostgreSQL)
├── middlewares/
│   └── auth.middleware.js      # JWT auth middleware & route guard
├── models/
│   ├── url.model.js            # URLs table schema
│   └── user.model.js           # Users table schema
├── routes/
│   ├── url.route.js            # URL CRUD endpoints
│   └── user.route.js           # Signup & login endpoints
├── services/
│   ├── url.service.js          # URL database operations
│   └── user.service.js         # User database operations
├── utils/
│   └── token.js                # JWT token creation & validation
├── validations/
│   ├── request.validation.js   # Zod request body schemas
│   └── token.validation.js     # Zod token payload schemas
├── docker-compose.yml
├── drizzle.config.js
└── index.js                    # Express app entry point
```

#### Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/user/signup` | ✗ | Register a new user |
| `POST` | `/user/login` | ✗ | Login & receive JWT token |
| `POST` | `/shorten` | ✓ | Create a shortened URL |
| `GET` | `/codes` | ✓ | List all user's shortened URLs |
| `PATCH` | `/:id` | ✓ | Update a shortened URL (target URL or short code) |
| `DELETE` | `/:id` | ✓ | Delete a shortened URL |
| `GET` | `/:shortcode` | ✗ | Redirect to the original URL |

#### Key Features

- JWT-based authentication with global middleware
- nanoid-generated short codes (or custom user-provided codes)
- Partial updates via PATCH (Zod `.refine()` ensures at least one field)
- Ownership validation — users can only modify/delete their own URLs
- Strict request validation with Zod 4

**Tech stack:** Express 5, Drizzle ORM, PostgreSQL 17, JWT, nanoid, Zod 4, Docker, pnpm.

---

## 🛠️ Tech Stack

| Technology | Used In |
|-----------|---------| 
| **Node.js** | All modules |
| **Express.js** (v5) | Module-4, Authentication-01, AUTHENTICATION-SESSION, ExpressWithTypeScript, URL_Shortner_Service |
| **TypeScript** (v7) | ExpressWithTypeScript |
| **Drizzle ORM** | BookStoreProject, AUTHENTICATION-SESSION, NODE-ORM-1, URL_Shortner_Service |
| **PostgreSQL** | BookStoreProject, AUTHENTICATION-SESSION, NODE-ORM-1, URL_Shortner_Service |
| **Docker / Docker Compose** | BookStoreProject, AUTHENTICATION-SESSION, NODE-ORM-1, URL_Shortner_Service |
| **MongoDB** | MongoDB |
| **Mongoose** (v9) | MongoDB |
| **JWT** (`jsonwebtoken`) | AUTHENTICATION-SESSION, MongoDB, URL_Shortner_Service |
| **Zod** (v4) | URL_Shortner_Service |
| **nanoid** | URL_Shortner_Service |
| **dotenv** | BookStoreProject, AUTHENTICATION-SESSION, NODE-ORM-1, MongoDB, URL_Shortner_Service |
| **pnpm** | AUTHENTICATION-SESSION, MongoDB, URL_Shortner_Service |
| **npm** | All other modules |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (for PostgreSQL-based modules)
- [MongoDB](https://www.mongodb.com/) (for the `MongoDB` module — local or Atlas)
- [pnpm](https://pnpm.io/) (for `AUTHENTICATION-SESSION`, `MongoDB`, and `URL_Shortner_Service`)

### Running a Module

```bash
# Navigate into any module directory
cd module-1

# Install dependencies
npm install

# Run the code
node index.js

# For modules with a start script (Module-4, Authentication-01, etc.)
npm start
```

### Database Modules (BookStoreProject, AUTHENTICATION-SESSION, NODE-ORM-1, URL_Shortner_Service)

```bash
# Start PostgreSQL via Docker
docker compose up -d

# Push schema to database (where applicable)
npm run db:push    # or: pnpm db:push

# Start the server
npm start          # or: pnpm start
```

---

## 📝 Learning Path (Recommended Order)

1. **module-1** — File System basics
2. **MODULES** — CommonJS module system
3. **module-2** — Events & Buffers
4. **module-3** — HTTP Servers from scratch
5. **Module-4 / 01_express** — Express.js intro
6. **NODE-ORM-1** — Drizzle ORM basics
7. **Module-4 / BookStoreProject** — Full REST API
8. **Authentication-01** — Auth fundamentals
9. **AUTHENTICATION-SESSION** — JWT auth with role-based access
10. **MongoDB** — MongoDB + Mongoose with JWT auth
11. **ExpressWithTypeScript** — Express + TypeScript with MVC architecture
12. **URL_Shortner_Service** — Full URL shortener with JWT auth & CRUD

---

## 👤 Author

**Shubham Rohilla**

---

## 📄 License

ISC
