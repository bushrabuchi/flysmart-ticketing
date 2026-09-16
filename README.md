# Mini Flysmart ticketing demo

Unofficial React + Express demo of a flight search → traveller → pay → e-ticket flow.

```
flysmart/
├── flysmart-ticketing/   React 19, Vite, JavaScript, Router, SCSS, ESLint, Playwright
└── backend/               Node.js, Express, REST API, PostgreSQL (with in-memory fallback)
```

## Run with Docker

From the repository root, build and start the API, frontend, and PostgreSQL services:

```bash
docker compose up --build
```

Open http://localhost:5173. Stop the services with `docker compose down`; add `-v` when you also want to remove the PostgreSQL data volume.

## Run locally

**1. API**

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

API: http://localhost:4000/api/health

PostgreSQL is optional. Without `DATABASE_URL` or if Postgres is down, the API stores flights and bookings in memory.

To use Postgres:

```bash
docker compose up -d
```

Then keep `DATABASE_URL=postgres://flysmart:flysmart@localhost:5432/flysmart` in `backend/.env`.

**2. Frontend**

```bash
cd flysmart-ticketing
npm install
npm run dev
```

App: http://localhost:5173 (Vite proxies `/api` to the backend).

**3. Playwright**

```bash
cd flysmart-ticketing
npx playwright install chromium
npm run test:e2e
```

## REST API

| Method | Path                           | Description         |
| ------ | ------------------------------ | ------------------- |
| GET    | `/api/health`                  | Health check        |
| GET    | `/api/airports`                | Airport list        |
| GET    | `/api/flights?from=RUH&to=DXB` | Search flights      |
| POST   | `/api/bookings`                | Create demo booking |
| GET    | `/api/bookings/:id`            | Fetch booking       |

Payment is simulated. No real cards or airline tickets are issued.
