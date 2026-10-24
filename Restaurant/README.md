# Lumière

## Reservation backend and admin dashboard

The reservation form stores submissions through a Vercel Function in Upstash Redis. It does not open WhatsApp. The admin dashboard is available at `/#admin` and requires the `RESERVATION_ADMIN_TOKEN`.

### Configure the backend

1. Import the GitHub repository `Izzakio/Lumiere` into Vercel and set **Root Directory** to `Restaurant`.
2. Set the Vercel build output directory to `dist` and add `VITE_BASE_PATH=/` to the Vercel project's environment variables.
3. Create an Upstash Redis database from the Vercel Marketplace and add its REST URL and REST token to the Vercel project's environment variables as `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
4. Add `RESERVATION_ADMIN_TOKEN` as a private Vercel environment variable. Use a long, randomly generated value and do not put it in the frontend or GitHub Pages variables.
5. Add `ALLOWED_ORIGINS` as a comma-separated list of the exact production origins, for example `https://izzakio.github.io,https://your-project.vercel.app`. Do not add trailing slashes.
6. Redeploy the Vercel project. Its production domain hosts the API at `/api/reservations`.

### Connect GitHub Pages

1. In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables**.
2. Create the repository variable `RESERVATION_API_URL` with the Vercel production origin, for example `https://your-project.vercel.app` (no path or trailing slash).
3. Run the **Deploy Lumiere to GitHub Pages** workflow, or push a commit to `main`.

The public site remains at `https://izzakio.github.io/Lumiere/`. Its admin dashboard is at `https://izzakio.github.io/Lumiere/#admin`. Sign in with the private `RESERVATION_ADMIN_TOKEN` configured in Vercel. The dashboard shows the 100 most recent reservations.

Never expose Upstash credentials or the admin token in source code, client-side variables, or GitHub Actions variables.
