# Soccer Teams & Players API

CSE 341 Project 2 — a CRUD REST API built with Node.js, Express, and MongoDB
that manages soccer **teams** and **players**.

Live API: `<your Render URL here>`
Interactive docs (Swagger): `<your Render URL here>/api-docs`

## Collections

### teams
| Field       | Type   | Required | Notes                     |
|-------------|--------|----------|----------------------------|
| name        | string | yes      | Team name                  |
| country     | string | yes      | Country the team is from   |
| league      | string | yes      | League the team plays in   |
| foundedYear | number | yes      | Year founded (1850–2026)   |
| stadium     | string | yes      | Home stadium               |

### players (7+ fields)
| Field       | Type   | Required | Notes                                                              |
|-------------|--------|----------|---------------------------------------------------------------------|
| firstName   | string | yes      |                                                                     |
| lastName    | string | yes      |                                                                     |
| position    | string | yes      | One of: Goalkeeper, Defender, Midfielder, Forward, Winger          |
| team        | string | yes      | Team name the player belongs to                                    |
| nationality | string | yes      |                                                                     |
| age         | number | yes      | 14–50                                                              |
| jerseyNumber| number | yes      | 1–99                                                               |
| heightCm    | number | yes      | 100–250                                                             |

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/soccerApiDB
   PORT=3000
   ```
3. `npm start` (or `npm run dev` with nodemon)
4. Visit `http://localhost:3000/api-docs` for interactive Swagger documentation.

## Endpoints

### Teams
| Method | Route         | Description          |
|--------|---------------|-----------------------|
| GET    | /teams        | Get all teams         |
| GET    | /teams/:id    | Get a single team     |
| POST   | /teams        | Create a new team     |
| PUT    | /teams/:id    | Update a team         |
| DELETE | /teams/:id    | Delete a team         |

### Players
| Method | Route          | Description            |
|--------|----------------|--------------------------|
| GET    | /players       | Get all players         |
| GET    | /players/:id   | Get a single player     |
| POST   | /players       | Create a new player     |
| PUT    | /players/:id   | Update a player         |
| DELETE | /players/:id   | Delete a player         |

## Validation & Error Handling

- All request bodies are validated with `express-validator` (required fields,
  types, and value ranges — e.g. `position` must be one of a fixed list,
  `age` must be 14–50).
- All `:id` params are checked to be valid MongoDB ObjectIds before hitting
  the database.
- Invalid input returns `400` with a list of validation errors.
- A missing resource returns `404`.
- Unexpected server/database errors are caught in each controller and return
  `500` with a message (never a raw stack trace to the client).
- Requests to undefined routes return a `404` JSON message via a catch-all
  middleware.

## Example Requests

**Create a team**
```
POST /teams
Content-Type: application/json

{
  "name": "FC Awesome",
  "country": "Guatemala",
  "league": "Liga Nacional",
  "foundedYear": 1998,
  "stadium": "Estadio Central"
}
```

**Create a player**
```
POST /players
Content-Type: application/json

{
  "firstName": "Juan",
  "lastName": "Reyes",
  "position": "Winger",
  "team": "FC Awesome",
  "nationality": "Guatemalan",
  "age": 28,
  "jerseyNumber": 11,
  "heightCm": 168
}
```

## Deployment (Render)

1. Push this repo to GitHub (`.env` is git-ignored — never commit credentials).
2. Create a new Web Service on Render, connect your GitHub repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Add `MONGODB_URI` as an environment variable in Render's dashboard
   (Settings → Environment).
5. Once deployed, update the "Live API" link above and re-test all routes
   against the Render URL (e.g. with Postman) before recording your demo video.
