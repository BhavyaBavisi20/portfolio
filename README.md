# Bhavya Portfolio Monorepo

Full-stack personal portfolio built as a monorepo with:
- `apps/web`: React + Vite frontend
- `apps/api`: Express + MongoDB backend API

The frontend renders portfolio content from API endpoints (projects, skills, blogs, achievements, certificates), includes a contact form, and ships with a grounded AI chat assistant (`Bhavya.AI`).

## Tech Stack

### Frontend (`apps/web`)
- React 19 + Vite 7
- Tailwind CSS
- Framer Motion animations
- Axios for API calls
- Three.js / React Three Fiber / Drei (interactive visuals)

### Backend (`apps/api`)
- Node.js + Express
- MongoDB + Mongoose
- Helmet + CORS
- express-validator
- express-rate-limit
- Nodemailer (contact notifications)
- LangChain + Hugging Face Inference (RAG assistant)

## Monorepo Structure

```text
portfolio/
|-- apps/
|   |-- web/    # Vite frontend
|   `-- api/    # Express backend
|-- package.json
`-- README.md
```

## Features

- Dynamic portfolio sections from backend APIs
- Projects and blog detail routes (`/api/projects/:id`, `/api/blogs/:id`)
- Contact form with validation + rate limiting + email notification
- RAG-powered portfolio chatbot with source grounding
- Health check endpoint (`/api/health`)
- Seed script to populate MongoDB from local portfolio data

## API Routes

Base URL: `http://localhost:5000`

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/skills`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `GET /api/achievements`
- `GET /api/certificates`
- `POST /api/contact`
- `POST /api/chat`

## Environment Variables

Create `apps/api/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
CORS_ORIGIN=http://localhost:5173

# Hugging Face (for /api/chat)
HUGGINGFACE_API_KEY=hf_your_token_here
HUGGINGFACE_PROVIDER=hf-inference
HUGGINGFACE_CHAT_MODEL=katanemo/Arch-Router-1.5B
HUGGINGFACE_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# Contact mail (recommended: Resend)
DISABLE_EMAIL_NOTIFICATIONS=false
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM=onboarding@resend.dev
RESEND_TO=you@example.com

# Optional: Brevo transactional API
BREVO_API_KEY=xkeysib-xxxxxxxxx
BREVO_FROM=your_verified_sender@example.com
BREVO_TO=you@example.com
BREVO_SENDER_NAME=Portfolio Contact

# SMTP fallback (often blocked on cloud hosts)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM=your_gmail@gmail.com
MAIL_TO=you@example.com
```

Create `apps/web/.env` (optional):

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Local Development

From repo root:

```bash
npm install
```

Run backend:

```bash
npm run dev:api
```

Run frontend:

```bash
npm run dev:web
```

Seed database:

```bash
npm run seed:api
```

## Production Notes (Render)

- Backend uses `app.set("trust proxy", 1)` in production/Render for correct rate-limit IP detection.
- Ensure all required environment variables are configured in Render.
- Set frontend `VITE_API_BASE_URL` to deployed API URL.
- Prefer API-based providers (`RESEND_API_KEY` or `BREVO_API_KEY`) because SMTP egress can fail on hosted platforms.

## Scripts

Root scripts:
- `npm run dev:web` - start frontend dev server
- `npm run dev:api` - start backend dev server
- `npm run seed:api` - seed MongoDB data

App scripts:
- `apps/web`: `dev`, `build`, `preview`, `lint`
- `apps/api`: `dev`, `start`, `seed`
