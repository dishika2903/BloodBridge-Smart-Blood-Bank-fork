# BloodBridge – Smart Blood Bank Platform

A full-stack blood bank management system with **Node.js + Express** backend and **React** frontend. Built for Evaluation-1 scope (Lectures 1–24): Express, Mongoose, REST APIs, middleware, static files, no auth/JWT/Passport.

---

## Features

- **Donor registration** – Name, blood group, phone, city, last donation date; eligibility auto-calculated (available if last donation > 3 months ago)
- **Inventory** – View and update blood units by group (PUT)
- **Blood requests** – Create requests; view matching results (compatible donors + available units)
- **Matching logic** – A+→A+,A-,O+,O-; B+→B+,B-,O+,O-; AB+→all; O-→O- only; approve deducts inventory
- **Dark UI** – Red/black theme, glassmorphism cards, smooth animations

---

## Tech Stack

| Layer    | Stack                          |
|----------|---------------------------------|
| Backend  | Node.js, Express, Mongoose      |
| Frontend | React 18, React Router, Vite    |
| Database | MongoDB                         |
| Other    | dotenv, cors, morgan            |

---

## Project Structure

```
BloodBridge/
├── client/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── .env.example            # Copy to .env (server)
└── README.md
```

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (local or Atlas)

---

## MongoDB Connection

### Option 1: Local MongoDB

1. Install and start MongoDB locally.
2. Create a database (e.g. `bloodbridge`). It will be created automatically on first connect.
3. In `server/.env` set:
   ```env
   MONGO_URI=mongodb://localhost:27017/bloodbridge
   ```

### Option 2: MongoDB Atlas

1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Get the connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/bloodbridge?retryWrites=true&w=majority`).
3. In `server/.env` set:
   ```env
   MONGO_URI=<your-atlas-connection-string>
   ```

---

## Setup & Run

### 1. Environment

```bash
# From project root
cd server
cp .env.example .env
# Edit .env and set MONGO_URI (and optionally PORT)
```

### 2. Backend

```bash
cd server
npm install
npm run dev
# Server runs at http://localhost:5000
```

### 3. Seed data (optional)

```bash
cd server
npm run seed
```

This inserts sample donors, inventory, and blood requests.

### 4. Frontend

```bash
cd client
npm install
npm run dev
# App runs at http://localhost:3000
```

Vite proxy forwards `/api` to `http://localhost:5000`, so API calls work without CORS issues when both are running.

---

## Running Frontend & Backend Separately

- **Backend only:** `cd server && npm run dev` → API at `http://localhost:5000`
- **Frontend only:** `cd client && npm run dev` → UI at `http://localhost:3000`

If you run the frontend without the proxy (e.g. build and serve elsewhere), set:

```env
VITE_API_URL=http://localhost:5000/api
```

in `client/.env` so requests go to the correct API base.

---

## API Routes

| Method | Endpoint                          | Description                |
|--------|-----------------------------------|----------------------------|
| POST   | `/api/donors`                     | Create donor               |
| GET    | `/api/donors`                     | List donors                |
| GET    | `/api/donors/:id`                 | Get donor by ID            |
| PUT    | `/api/donors/:id`                 | Update donor               |
| DELETE | `/api/donors/:id`                 | Delete donor               |
| GET    | `/api/inventory`                  | List inventory             |
| PUT    | `/api/inventory/update/:bloodGroup` | Update units by group   |
| POST   | `/api/requests`                   | Create blood request       |
| GET    | `/api/requests`                   | List requests              |
| PUT    | `/api/requests/status/:id`        | Set status (Approved/Rejected) |
| GET    | `/api/requests/match/:id`         | Matching result for request |
| POST   | `/api/auth/signup`                | Signup (create user)       |
| POST   | `/api/auth/login`                 | Login (email + password)   |

---

## Pages

1. **Landing** (`/`) – Hero, tagline, about, features, CTA to dashboard.
2. **Login** (`/login`) – Email + password login, in-memory React auth state (no JWT/sessions/cookies).
3. **Signup** (`/signup`) – Create Admin/Staff users; on success redirects to login.
4. **Dashboard** (`/app`) – Total donors, total units, pending requests; recent requests with link to match. Protected route (requires login).
5. **Donor Registration** (`/app/donors`) – Form → POST `/api/donors`. Protected route; accessible to Admin and Staff.
6. **Inventory** (`/app/inventory`) – Table of blood groups and units; inline edit → PUT. Protected route; only Admin can update units (Staff is view-only).
7. **Blood Request** (`/app/request`) – Form → POST `/api/requests`; redirects to match page. Protected route; accessible to Admin and Staff.
8. **Matching Result** (`/app/match/:requestId`) – Request details, compatible units, eligible donors; Approve/Reject → PUT status (approve deducts inventory). Protected route; only Admin sees approve/reject controls.

---

## Middleware (Backend)

- **Logger** – Morgan for HTTP logging.
- **Error handler** – Central error-handling middleware.
- **Validation** – Request body validation for donors, requests, inventory update.
- **Donor eligibility** – Logic in model (pre-save) and in matching (last donation > 3 months).
- **Inventory check** – Controller checks inventory before approving and deducts units.

---

## Sample .env (server)

See `server/.env.example` or create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/bloodbridge

# Optional default admin used by npm run seed
DEFAULT_ADMIN_NAME=BloodBridge Admin
DEFAULT_ADMIN_EMAIL=admin@bloodbridge.com
DEFAULT_ADMIN_PASSWORD=admin123
```

---

## Creating the First Admin User

- **Using seed script (recommended for local dev):**
  1. Ensure MongoDB is running and `server/.env` is configured.
  2. Optionally edit `DEFAULT_ADMIN_*` values in `server/.env`.
  3. Run:
     ```bash
     cd server
     npm install
     npm run seed
     ```
  4. Log in at `/login` using the seeded admin email and password.

- **Using UI:**
  1. Start backend and frontend (`npm run dev` in `server` and `client`).
  2. Visit `/signup`, create an **Admin** user, then log in at `/login`.

---

## License

For educational / project use.
