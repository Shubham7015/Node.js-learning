# 🍃 MongoDB — User Authentication API

A RESTful user authentication API built with **Express 5**, **Mongoose**, and **JWT**, featuring sign-up, login, and profile update with salted password hashing.

---

## 📁 Project Structure

```
MongoDB/
├── index.js                    # App entry point — Express server setup
├── connection.js               # MongoDB connection helper (Mongoose)
├── models/
│   └── user.model.js           # User schema (name, email, password, salt)
├── routes/
│   └── user.route.js           # User routes — signup, login, update profile
├── middlewares/
│   └── auth.middleware.js      # JWT auth middleware & route guard
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
└── pnpm-lock.yaml
```

---

## 🔐 Auth Flow

### 1. Sign Up — `POST /user/signup`

Registers a new user with a salted HMAC-SHA256 password hash.

**Request Body:**
```json
{
  "name": "Shubham",
  "email": "shubham@example.com",
  "password": "mysecretpass"
}
```

**Response** (`201`):
```json
{
  "status": "Success",
  "data": { "id": "..." }
}
```

### 2. Login — `POST /user/login`

Authenticates the user and returns a signed JWT token.

**Request Body:**
```json
{
  "email": "shubham@example.com",
  "password": "mysecretpass"
}
```

**Response** (`200`):
```json
{
  "status": "Success",
  "token": "eyJhbGciOi..."
}
```

### 3. Update Profile — `PATCH /user`

Updates the authenticated user's name. Requires a valid JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Shubham Rohilla"
}
```

**Response** (`200`):
```json
{
  "status": "Success",
  "user": { "_id": "...", "name": "Shubham Rohilla", "email": "..." }
}
```

---

## 🛡️ Middlewares

| Middleware | Scope | Purpose |
|---|---|---|
| `authValidation` | Global | Parses `Authorization: Bearer <token>` header, verifies JWT, and attaches decoded payload to `req.user`. Passes through silently if no token is present. |
| `ensureAuthenticated` | Route-level | Returns `401` if `req.user` is not set — used to protect private routes. |

---

## 🗄️ Database Schema

**User Model** (`users` collection):

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | Required |
| `email` | String | Required, Unique |
| `password` | String | Required (HMAC-SHA256 hash) |
| `salt` | String | Required (random 256-byte hex) |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Express 5** | HTTP server & routing |
| **Mongoose 9** | MongoDB ODM |
| **jsonwebtoken** | JWT token signing & verification |
| **dotenv** | Environment variable management |
| **Node.js crypto** | `randomBytes` + `createHmac` for password hashing |
| **pnpm** | Package manager |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [pnpm](https://pnpm.io/)

### Setup

```bash
# Navigate to the project
cd MongoDB

# Install dependencies
pnpm install

# Create a .env file
```

**`.env` file:**
```env
PORT=8000
DATABASE_URL=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret-key
```

### Run

```bash
# Start the server (with file watching)
pnpm start
```

The server will start on `http://localhost:8000`.

---

## 📬 API Reference

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/user/signup` | ❌ | Register a new user |
| `POST` | `/user/login` | ❌ | Login & get JWT token |
| `PATCH` | `/user` | ✅ | Update user's name |

---

## 👤 Author

**Shubham Rohilla**

---

## 📄 License

ISC
