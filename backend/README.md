# UniClub Hub Backend

Express and MongoDB API for UniClub Hub.

## Setup

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Environment

```bash
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/uniclubhub
```

MongoDB Atlas users may provide `MONGODB_URI` instead of `MONGO_URI`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Nodemon. |
| `npm start` | Start the API with Node. |
| `npm run seed` | Insert demo clubs and events. |
| `npm test` | Run Jest/Supertest API tests. |

## API Resources

- Clubs: create, list, update, delete, favourite.
- Events: create, list, update, delete, RSVP, cancel RSVP.
- Stats: dashboard engagement totals.
