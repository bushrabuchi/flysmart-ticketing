# Fly Smart

A responsive React + Vite flight-booking demo. It includes flight search, filters, traveller details, a simulated checkout, and a demo e-ticket. No real payment is taken.

The homepage hero photo is served locally from `public/images/travel-hero-wide.webp` and sourced from [Unsplash](https://unsplash.com/license).

## Run locally

From this directory:

```bash
npm install
npm run dev
```

The app runs at <http://localhost:5173>. For live flight search and saved demo bookings, also start the API from the repository's `backend` directory:

```bash
cd ../backend
npm install
npm run dev
```

The API runs at <http://localhost:4000>. Without it, the frontend uses its built-in sample flights and creates a local demo confirmation.

## Deploy the frontend to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket and import it in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `flysmart-ticketing` and keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
3. Deploy once to get a Vercel URL. The `vercel.json` rewrite keeps React Router routes such as `/flights` working after refresh.
4. For live search and persistent bookings, deploy the API separately (see below), then add this Vercel environment variable under **Project → Settings → Environment Variables**:

   ```text
   VITE_API_URL=https://YOUR-API-HOST/api
   ```

   Use the API's public HTTPS URL with `/api` and no trailing slash. This value is bundled into the public frontend, so never put credentials or secrets in a `VITE_` variable.
5. Set the backend's `FRONTEND_URL` to the deployed Vercel origin, for example `https://your-project.vercel.app`. Include any custom production domain as well, comma-separated if needed.
6. Redeploy the Vercel project after adding or changing environment variables. Confirm the API is live at `https://YOUR-API-HOST/api/health`, then test a full booking on the deployed site.

The frontend can be deployed without a backend, but search and booking will then use demo-only local fallbacks. Deploying a backend with an in-memory store is also suitable only for demos: bookings are lost when the service restarts. Configure a managed PostgreSQL database through `DATABASE_URL` if bookings need to persist.

## Deploy the API

The API is a separate Express service in the repository's `backend` directory. Deploy it to a Node.js host such as Render, Railway, or Fly.io:

1. Create a web service from this repository and set its root directory to `backend`.
2. Set the build/install command to `npm install` and the start command to `npm start`.
3. Set `FRONTEND_URL` to your Vercel origin. Set `DATABASE_URL` to a managed PostgreSQL connection string for persistent bookings; without it, the API uses an in-memory store.
4. After deploying, use the service URL plus `/api` for `VITE_API_URL`.

## Quality checks

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```
