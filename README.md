# UniClub Hub

UniClub Hub is a complete MERN stack web application for **DLBCSPJWD01 Project Java and Web Development**. It is a campus community platform where university students can explore clubs, browse events, RSVP to activities, save favourite clubs, and view simple engagement statistics.

This project is intentionally different from a study planner. It uses a new data model, new UI concept, and new feature set focused on clubs, events, and campus participation.

## Student Information

| Field | Value |
| --- | --- |
| Student name | Anas Muhammad Ismail |
| Matriculation number | 4235232 |
| Course | DLBCSPJWD01 Project Java and Web Development |

## Problem Statement

University students often discover clubs and events through scattered announcements, chat groups, or notice boards. UniClub Hub centralizes club discovery and event participation in one responsive browser application.

## Target Users

- University students looking for clubs and campus events.
- Student club organizers who need to list clubs and activities.
- Academic evaluators reviewing a practical MERN stack project.

## Main Features

- Dashboard with total clubs, total events, upcoming events, total RSVPs, favourite clubs, and engagement percentage.
- Club CRUD: create, view, edit, delete, favourite/unfavourite, and filter by category.
- Event CRUD: create, view, edit, delete, RSVP, cancel RSVP, and filter by type or date status.
- Premium demo login and signup pages with local browser session state.
- Responsive React interface with dashboard hero, top navigation, cards, forms, empty states, loading states, and error messages.
- Express API with route separation, validation, error handling, and MongoDB persistence.
- Seed data script for a complete demo experience.
- Backend API tests with Jest, Supertest, and MongoDB Memory Server.

## Technology Choices

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | React.js with Vite | Fast browser app development with reusable components. |
| Routing | React Router DOM | Multi-page dashboard, clubs, events, and about views. |
| Styling | Tailwind CSS | Mobile-first responsive layout and clean UI styling. |
| HTTP Client | Axios | Simple frontend-backend communication. |
| Backend | Node.js + Express.js | REST API for clubs, events, RSVPs, favourites, and stats. |
| Database | MongoDB + Mongoose | Document storage with schemas, validation, and timestamps. |
| Logging | Morgan | Development request logging. |
| Testing | Jest + Supertest | Automated backend endpoint tests. |

## Architecture Overview

```text
React + Vite Frontend
  -> Axios API client
  -> Express REST API
  -> Mongoose Models
  -> MongoDB Database
```

The frontend is split into pages and reusable components. Pages manage screen-level state such as loading, filters, form input, and success messages. The API client in `frontend/src/api/apiClient.js` centralizes all HTTP calls.

The backend separates routes, controllers, models, middleware, and configuration. `backend/src/app.js` defines the Express app for both runtime and tests, while `backend/src/server.js` connects to MongoDB and starts the server.

The Login and Signup screens use local browser storage to demonstrate a polished access flow without adding production authentication complexity. This keeps the project aligned with the course scope while still presenting a complete user-facing experience.

## Frontend-Backend Communication

React uses Axios to call Express endpoints under `/api`. For example, the dashboard calls `GET /api/stats`, the Clubs page calls `/api/clubs`, and the Events page calls `/api/events`. After mutations such as RSVP or favourite toggling, the frontend reloads the affected data so the UI immediately reflects backend state.

By default, the frontend calls `http://localhost:5050/api`. If the browser shows an API warning, confirm that the backend is running and that `frontend/.env` uses the same port as `backend/.env`.

## Folder Structure

```text
uniclub-hub/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── tests/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── screenshots/
│   └── .gitkeep
├── .gitignore
└── README.md
```

## Environment Variables

Create `backend/.env`:

```bash
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/uniclubhub
```

MongoDB Atlas users may use `MONGODB_URI` instead:

```bash
PORT=5050
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uniclubhub
```

Create `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5050/api
```

## Installation

Install backend dependencies:

```bash
cd uniclub-hub/backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Commands

Start MongoDB locally, then seed demo data:

```bash
cd uniclub-hub/backend
npm run seed
```

Run the backend API:

```bash
cd uniclub-hub/backend
npm run dev
```

Run the frontend in a second terminal:

```bash
cd uniclub-hub/frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## Test Commands

Run backend tests:

```bash
cd uniclub-hub/backend
npm test
```

Build the frontend:

```bash
cd uniclub-hub/frontend
npm run build
```

## API Endpoint Table

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Check API status. |
| GET | `/api/clubs` | List clubs, optionally filtered by `category`. |
| POST | `/api/clubs` | Create a club. |
| PUT | `/api/clubs/:id` | Update a club. |
| DELETE | `/api/clubs/:id` | Delete a club. |
| PATCH | `/api/clubs/:id/favourite` | Toggle favourite status. |
| GET | `/api/events` | List events, optionally filtered by `type` and `status`. |
| POST | `/api/events` | Create an event. |
| PUT | `/api/events/:id` | Update an event. |
| DELETE | `/api/events/:id` | Delete an event. |
| PATCH | `/api/events/:id/rsvp` | Increase RSVP count. |
| PATCH | `/api/events/:id/cancel-rsvp` | Decrease RSVP count. |
| GET | `/api/stats` | Get dashboard statistics. |

## Authentication Note

The current Login and Signup pages are a frontend demo session, not production authentication. They validate form input, save a local demo user in `localStorage`, update the navbar, and allow logout. A production version would add password hashing, JWT/session handling, protected backend routes, and a `User` model.

## Code Documentation Notes

Important functions and architectural blocks include concise comments explaining their purpose, especially API setup, database connection, server startup fallback, demo authentication state, dashboard data loading, and reusable asset loading. Comments are intentionally focused so the code remains readable and professional for IU review.

## Test Case Table

| Test Case | Endpoint | Expected Result |
| --- | --- | --- |
| Health check | `GET /api/health` | Returns success response. |
| Create club | `POST /api/clubs` | Creates and returns a club. |
| Get clubs | `GET /api/clubs` | Returns filtered club list. |
| Favourite club | `PATCH /api/clubs/:id/favourite` | Toggles favourite status. |
| Create event | `POST /api/events` | Creates and returns an event. |
| RSVP event | `PATCH /api/events/:id/rsvp` | Increments RSVP count. |
| Stats endpoint | `GET /api/stats` | Returns engagement statistics. |

## Screenshots Placeholder

Add screenshots to the `screenshots/` folder before submission:

- `screenshots/dashboard.png`
- `screenshots/clubs.png`
- `screenshots/events-mobile.png`

## Local Visual Assets

The frontend automatically loads local images from:

```text
frontend/src/assets/
```

Supported formats are `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`, and `.svg`. These images are used on the dashboard hero area and the About page gallery.

## Screencast Note

For a project screencast, show the dashboard first, then create a club, mark it as favourite, create an event, RSVP to the event, and refresh the dashboard statistics.

## Limitations and Future Work

- Login and signup currently use local demo session state rather than secure server-side authentication.
- RSVP actions are simple counters and do not track individual student identities.
- Future versions could add password hashing, JWT sessions, organizer roles, comments, event reminders, and richer analytics.

## GitHub Submission Note

Before submitting, commit the project and push it to GitHub. Include the repository URL in the IU submission portal.

```bash
git init
git add .
git commit -m "Build UniClub Hub MERN application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uniclub-hub.git
git push -u origin main
```
