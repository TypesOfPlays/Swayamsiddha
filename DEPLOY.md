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

Your site will be at:

```
https://<your-username>.github.io/<your-repo>/
```

## Why nothing is hard-coded

The build needs to know that URL, because a project site is served from a
subfolder and every asset path has to carry it. Rather than hard-coding it, the
workflow derives both halves from the repository itself:

| Value | Comes from |
|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `/<repository name>` |
| `NEXT_PUBLIC_SITE_URL` | `https://<owner>.github.io` (lower-cased) |

So renaming the repository, transferring it, or forking it all keep working
with no edits. Locally both are empty, which is why `npm run dev` still serves
from `http://localhost:3000/`.

## Moving to a real domain later

A project-site URL is long and ranks worse than a domain for local searches like
"blood test near Ichhapur". When you're ready:

1. Buy the domain and point a `CNAME` record at `<your-username>.github.io`.
2. Put the bare domain in **Settings → Pages → Custom domain**.
3. Add a file `public/CNAME` containing just the domain, so the setting survives
   each redeploy.
4. In `.github/workflows/deploy.yml`, set `base` to an empty string and `origin`
   to `https://your-domain.in`.

Step 4 matters: with a custom domain the site sits at the root, so the base path
must be removed or every asset URL will gain a folder that doesn't exist.

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
