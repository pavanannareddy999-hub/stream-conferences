# Stream Conferences

A real, multi-page React site for a conference-only brand — 3D particle-river
hero (Three.js), four track pages, a working registration form, and an
about/venues page. Routing is client-side via `react-router-dom`.

## Project structure

```
stream-conferences/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx              ← routes are defined here
    ├── index.css
    ├── components/
    │   ├── Scene3D.jsx      ← the Three.js hero scene
    │   ├── NavBar.jsx
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── TrackDetail.jsx  ← /tracks/:code
    │   ├── Register.jsx     ← /register
    │   └── Venue.jsx        ← /venue
    └── data/
        └── tracks.js        ← edit this to change event names/dates/content
```

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Hot-reloads as you edit.

## 2. Wire up the registration form

Open `src/pages/Register.jsx` and find this line near the top:

```js
const FORM_ACTION = "https://formspree.io/f/YOUR_FORM_ID";
```

1. Sign up free at [formspree.io](https://formspree.io).
2. Create a form, set the notification email to your inbox.
3. Replace `YOUR_FORM_ID` with the ID Formspree gives you.

Submissions include the manuscript-free registration fields (name, email,
affiliation, which tracks, access needs) — no file uploads, so there's no
size limit to worry about.

## 3. Build for production

```bash
npm run build
```

Outputs static files to `dist/`. You can preview the production build locally with:

```bash
npm run preview
```

## 4. Deploy to GitHub Pages (automatic, via GitHub Actions)

This project deploys itself automatically on every push to `main` — no local
build step, no `gh-pages` branch, no manual `npm run deploy`. A workflow at
`.github/workflows/deploy.yml` builds the site and publishes it whenever you
push.

**One-time setup in your repo:**

1. Go to **Settings → Pages**.
2. Under **Source**, change the dropdown from "Deploy from a branch" to
   **"GitHub Actions."**
3. Push this project to your repo (or push any small change) — that push
   triggers the workflow. Watch it run under the **Actions** tab.
4. Once it finishes (green checkmark), your site is live.

This also uses `HashRouter` for routing (see note above), so every route —
e.g. `/tracks/STRM-SYS` — works as `#/tracks/STRM-SYS` and survives a hard
refresh with zero extra server config.

### Custom domain (streamconference.com)

- `public/CNAME` already contains `streamconference.com`. Vite copies
  everything in `public/` straight into the build output, so every deploy
  includes it automatically — you won't lose your custom domain setting on
  future deploys.
- `vite.config.js` has `base: "/"`, which is correct **because the site is
  served from the root of a custom domain.** If you ever remove the custom
  domain and go back to `username.github.io/repo-name/`, change `base` back
  to `"/repo-name/"` — otherwise assets will 404 and the page will go blank.
- At your domain registrar (wherever you bought the domain), you still need
  DNS records pointing at GitHub:
  - Four **A records** for the root domain → `185.199.108.153`,
    `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - Optional **CNAME record** for `www` → `pavanannareddy999-hub.github.io`
- In **Settings → Pages → Custom domain**, enter `streamconference.com` and
  save. Once DNS propagates, click "Check again" to clear the DNS error.

## Editing content

- **Track names, dates, descriptions**: `src/data/tracks.js` — every page
  pulls from this one file, so editing it updates the home page cards, the
  schedule strip, and each track's detail page all at once.
- **Copy on the about/venue page**: `src/pages/Venue.jsx`.
- **Colors/fonts**: `tailwind.config.js` (the `ink`, `paper`, `flow`, `amber`
  color tokens and `display`/`body`/`mono` font families).
- **The 3D scene** (particle count, colors, curve shape, camera behavior):
  `src/components/Scene3D.jsx`.
