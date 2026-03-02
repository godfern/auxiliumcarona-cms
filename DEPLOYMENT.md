# Strapi production deployment – schema updates

Schema changes (content-types, components, new fields) live in your **code** (`src/api/*/content-types/`, `src/components/`). For them to show in production, the server must run the **new code** and **restart**.

## Why schema might not reflect in production

1. **No production build** – Production must run `npm run build` so the admin panel and server code are built from your latest schema.
2. **Old build artifacts** – Cached `dist/` or `build/` from a previous deploy can keep the old schema in use.
3. **Process not restarted** – After deploying, the Node process must be restarted so Strapi loads the new code and applies DB changes.
4. **Caching** – Browser or CDN cache can serve an old admin UI; try a hard refresh or clear cache.
5. **Wrong branch/commit** – Production might be deploying from a branch or commit that doesn’t include your schema changes.

## Recommended production deploy steps

Run these (or equivalent) on the production server or in your CI/CD:

```bash
# 1. Install dependencies (from the commit that has your schema changes)
npm ci

# 2. Remove old build output so the new schema is used
rm -rf dist build .cache

# 3. Build for production (compiles TS and admin with current schema)
npm run build

# 4. Start (or restart) the app
npm run start
```

If you use a process manager (e.g. PM2), restart after deploy:

```bash
pm2 restart school-cms
```

## One-time checklist

- [ ] Production deploy runs `npm run build` (not only `npm install` + `strapi start`).
- [ ] Deploy removes or overwrites `dist/` and `build/` before building.
- [ ] The running Node process is restarted after each deploy.
- [ ] Production uses the same repo/branch (and commit) that contains your schema changes.
- [ ] If using a CDN, purge cache for the admin path after deploy, or do a hard refresh when opening the admin.

After a deploy that includes schema changes, the **API** will serve the new content-types/fields once the new process is running, and the **admin UI** will show them after a fresh build and restart (and cache purge if needed).
