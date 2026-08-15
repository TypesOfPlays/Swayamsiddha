# Deploying to GitHub Pages

The site builds to a folder of plain HTML, CSS and JS — no server, no Node
process running anywhere. GitHub Pages just serves the files.

## One-time setup

**1. Create an empty repository on GitHub.** Don't add a README or .gitignore;
this project already has both. The repository name becomes part of your URL, so
pick something readable — `swayamsiddha-diagnostics` rather than `website`.

**2. Push this folder to it.**

```bash
git init -b main
git add .
git commit -m "Swayamsiddha Diagnostics landing page"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

**3. Turn on Pages.** In the repository: **Settings → Pages → Build and
deployment → Source**, choose **GitHub Actions**. Not "Deploy from a branch" —
that option ignores the workflow and will serve the raw source instead of the
built site.

That's it. Every push to `main` rebuilds and redeploys, and you can also trigger
one by hand from the **Actions** tab.

## The domain

The site is served from **https://swayamsiddhadiagnostics.in** (registered at
BigRock). Three things make that work, and all three must agree:

| Where | What |
|---|---|
| `public/CNAME` | the bare domain, no protocol — GitHub reads this on every deploy, so the setting survives redeploys |
| `.github/workflows/deploy.yml` | `base=` **empty**, `origin=https://swayamsiddhadiagnostics.in` |
| Registrar DNS | four `A` records at the apex, plus a `www` `CNAME` |

The empty base path is the part that bites. On the old
`<owner>.github.io/<repo>` URL the build prefixed every asset with `/<repo>`;
a custom domain serves from the root, so leaving that in would point every
image and stylesheet at a folder that no longer exists.

Locally both values are empty, which is why `npm run dev` still serves from
`http://localhost:3000/`.

### DNS records

Apex (`@`) `A` records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

`www` `CNAME` → `typesofplays.github.io`

GitHub redirects `www` to the apex once the custom domain is set, which is why
the canonical tag points at the bare domain.

### If the domain ever changes

Edit `public/CNAME` and the `origin` line in the workflow, then update the
custom domain in **Settings → Pages**. Everything else — canonical tags, the
sitemap, `robots.txt`, Open Graph images and the structured data — is built
from `SITE_URL` in `lib/site.ts` and follows automatically.

## Things that are easy to get wrong

- **The Pages source must be "GitHub Actions".** The default, "Deploy from a
  branch", publishes your source code instead of the built site.
- **`public/.nojekyll` must stay.** Pages runs Jekyll by default, which silently
  deletes any folder starting with an underscore — including Next's `_next`
  bundle directory. Without that file the site loads with no CSS or JS at all.
- **The default branch must be `main`.** The workflow triggers on it. If yours
  is `master`, change the branch name in `deploy.yml`.
- **Image paths go through `asset()`** in `lib/site.ts`. Static export turns off
  the Next.js image optimiser, and without the optimiser `next/image` emits the
  `src` string verbatim — so a raw `"/img/x.webp"` loses the base path and 404s
  in production while looking fine locally. Always wrap public paths in
  `asset()`.

## Re-optimising images

`public/img/*` are resized copies; the untouched originals live in `assets/img/`.
If you replace a photo, drop the original into `assets/img/` and resize it before
committing — the browser downloads these files exactly as they are, so a 3MB
phone photo is a 3MB download on someone's mobile data.

Current payload is about **330KB for all five photos**, down from 1.5MB.
