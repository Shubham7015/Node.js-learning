# 🐾 Pets API — Express with TypeScript

A RESTful API for managing pet data, built with **Express 5** and **TypeScript**. The project follows a clean MVC-style architecture with separate layers for routes, controllers, middlewares, and data.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 24+ | Runtime |
| **Express** | 5.x | Web framework |
| **TypeScript** | 7.x | Type safety |
| **CORS** | 2.x | Cross-origin support |

---

## Project Structure

```
ExpressWithTypeScript/
├── src/
│   ├── controllers/
│   │   └── pet.controller.ts    # Request handlers (getpets, getpetbyid)
│   ├── db/
│   │   └── pets.ts              # In-memory pet data & type definitions
│   ├── middlewares/
│   │   └── pets.middleware.ts   # Validation & auth middlewares
│   ├── routes/
│   │   └── pets.route.ts        # Route definitions for /pets
│   └── index.ts                 # App entry point
├── dist/                        # Compiled JS output
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## API Endpoints

### `GET /pets`

Returns all pets. Supports optional query parameters to filter results.

#### Query Parameters

| Parameter | Type | Description |
|---|---|---|
| `species` | `string` | Filter by species (e.g., `cat`, `dog`, `rat`) |
| `adopted` | `"true" \| "false"` | Filter by adoption status |
| `minAge` | `string` (number) | Filter pets with age ≥ value |
| `maxAge` | `string` (number) | Filter pets with age ≤ value |

> All filters can be **chained together** for combined filtering.

#### Example Requests

```bash
# Get all pets
GET http://localhost:8000/pets

# Get only cats
GET http://localhost:8000/pets?species=cat

# Get adopted pets
GET http://localhost:8000/pets?adopted=true

# Get non-adopted rats aged 5–10
GET http://localhost:8000/pets?species=rat&adopted=false&minAge=5&maxAge=10
```

#### Responses

- `200 OK` — Returns an array of matching pets.
- `404 Not Found` — `{ "message": "No pets found matching the given filters" }`

---

### `GET /pets/:id`

Returns a single pet by ID. This route is protected by two middlewares.

#### Middlewares (applied in order)

1. **`validateAuthentication`** — Requires `?password=please` query param.
2. **`validateNumberById`** — Validates that `:id` is a numeric string.

#### Example Requests

```bash
# Valid request
GET http://localhost:8000/pets/1?password=please

# Missing password → 401 Unauthorized
GET http://localhost:8000/pets/1

# Non-numeric ID → 400 Bad Request
GET http://localhost:8000/pets/abc?password=please
```

#### Responses

- `200 OK` — Returns the pet object.
- `400 Bad Request` — `{ "message": "Id must be a number" }`
- `401 Unauthorized` — `{ "message": "Unauthorized" }`
- `404 Not Found` — `{ "message": "No pet with current id " }`

---

### Any Other Route

- `404 Not Found` — `{ "message": "Route not found!" }`

---

## Pet Data Schema

```typescript
type pet = {
  id: number;
  name: string;
  species: string;
  breed: string;
  adopted: boolean;
  age: number;
  intakeDate: Date;
  adoptionDate?: Date;
  medicalRecord: {
    vaccinations: string[];
    weightKg: number;
    microchipId: string | null;
  };
  photo: string;
};
```

---

## Getting Started

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
cd ExpressWithTypeScript
npm install
```

### Run the Server

```bash
npm start
```

This compiles TypeScript and starts the server at **`http://localhost:8000`**.

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `npx tsc && node dist/index.js` | Compile TS → run the server |
