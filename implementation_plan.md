# Portfolio Backend — Express.js Implementation Plan

A production-grade Node.js + Express backend that powers the portfolio, replacing hardcoded [data/index.js](file:///c:/Users/Bhavya/portfolio/apps/web/src/data/index.js) with a real REST API backed by MongoDB. The frontend (React/Vite) will fetch data dynamically and submit the contact form through this API.

---

## Current State

The portfolio is a **pure frontend** (React + Vite) monorepo located at `apps/web`. All data — projects, skills, blogs, achievements, certificates — lives in a single static file `src/data/index.js`. The Contact section has a form but no submission logic.

---

## Proposed Changes

### Folder Structure — New `apps/api` package

```
portfolio/
├── apps/
│   ├── web/          ← existing React frontend
│   └── api/          ← NEW Express backend
│       ├── src/
│       │   ├── config/
│       │   │   └── db.js             # Mongoose connection
│       │   ├── models/
│       │   │   ├── Project.js
│       │   │   ├── Blog.js
│       │   │   ├── Message.js        # contact form submissions
│       │   │   └── Subscriber.js     # (optional) newsletter
│       │   ├── routes/
│       │   │   ├── projects.js
│       │   │   ├── skills.js
│       │   │   ├── blogs.js
│       │   │   ├── achievements.js
│       │   │   ├── certificates.js
│       │   │   └── contact.js
│       │   ├── controllers/
│       │   │   ├── projectsController.js
│       │   │   ├── blogsController.js
│       │   │   └── contactController.js
│       │   ├── middleware/
│       │   │   ├── errorHandler.js
│       │   │   └── rateLimiter.js
│       │   ├── utils/
│       │   │   └── sendEmail.js      # Nodemailer for contact form
│       │   └── app.js                # Express app setup
│       ├── .env                      # secrets (not committed)
│       ├── .env.example
│       ├── server.js                 # entry point
│       └── package.json
└── package.json                      ← update workspaces
```

---

### Backend Techniques & Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **Express.js** | HTTP server, routing |
| Database | **MongoDB** + **Mongoose** | Store all portfolio data |
| Email | **Nodemailer** | Contact form → your Gmail |
| Security | **Helmet** | HTTP security headers |
| CORS | **cors** | Allow React frontend origin |
| Rate Limiting | **express-rate-limit** | Protect `/contact` from spam |
| Validation | **express-validator** | Validate contact form inputs |
| Environment | **dotenv** | Manage secrets |
| Dev tools | **nodemon** | Auto-restart in development |

---

### API Routes

#### 📦 Portfolio Data (Read-Only)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/projects/:id` | Single project |
| `GET` | `/api/skills` | Skills grouped by category |
| `GET` | `/api/blogs` | All blog posts |
| `GET` | `/api/blogs/:id` | Single blog post |
| `GET` | `/api/achievements` | Achievements list |
| `GET` | `/api/certificates` | Certificates list |
| `GET` | `/api/health` | Server health check |

#### 📬 Contact Form (Write)
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit contact message + email notification |

---

### MongoDB Data Models

```js
// Project
{ title, role, image, description, impact, tags: [], links: { demo, code, caseStudy }, order }

// Blog
{ title, excerpt, content, date, readTime, tags: [], published: Boolean }

// Message (contact)
{ name, email, subject, message, createdAt, read: Boolean }
```

---

### Contact Form Flow

```
User submits form
      │
      ▼
POST /api/contact
      │
      ├── express-validator → validate inputs
      ├── rate-limiter → max 5 requests/15min per IP
      ├── Save to MongoDB (Message model)
      └── Nodemailer → email notification to you
            │
            ▼
        200 OK / 400 error
```

---

### Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/portfolio
CORS_ORIGIN=http://localhost:5173

# Email (Nodemailer)
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your@gmail.com
```

---

### Frontend Integration

The React frontend will use **axios** (or native `fetch`) to call the API:

```js
// Before: static import
import { PROJECTS } from '../data/index.js'

// After: dynamic API call
const [projects, setProjects] = useState([]);
useEffect(() => {
  axios.get('http://localhost:5000/api/projects').then(r => setProjects(r.data));
}, []);
```

A shared `API_BASE_URL` constant pointing to the backend will be added to the frontend.

---

### Seed Script

A one-time `seed.js` script will migrate all existing data from `data/index.js` into MongoDB so nothing is lost.

---

## Build Phases

| Phase | What we build |
|---|---|
| **1** | Project scaffold — `apps/api`, `package.json`, Express server, DB connection |
| **2** | Models + seed script (migrate all existing data to MongoDB) |
| **3** | Routes + controllers (all GET routes) |
| **4** | Contact POST — validation, rate-limit, Nodemailer email |
| **5** | Frontend integration — replace static imports with API calls |

---

## Verification Plan

### Automated (API testing)
- Use Thunder Client / Postman to hit all `GET` routes and verify correct JSON
- Submit contact form → verify DB insertion + email received

### Manual
- Start both `api` and `web` dev servers simultaneously
- Confirm frontend renders data fetched live from the API
- Confirm contact form submission triggers email notification
