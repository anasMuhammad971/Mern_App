# UniClub Hub Frontend

React + Vite frontend for UniClub Hub.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

```bash
VITE_API_URL=http://localhost:5050/api
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build locally. |

## Pages

- Dashboard: campus overview and engagement statistics.
- Clubs: club CRUD, favourite toggle, category filter.
- Events: event CRUD, RSVP actions, type and date filters.
- About: short project and architecture summary.
- Login and Signup: premium demo access flow with local browser session state.

## Local Images

Place campus or club images in `src/assets/`. The app automatically loads supported image files and displays them on the Dashboard and About pages.

## Demo Authentication

The Login and Signup pages use `localStorage` through `src/context/AuthContext.jsx`. This is intended for presentation and UI completeness. It is not production authentication.
