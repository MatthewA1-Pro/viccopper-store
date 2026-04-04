# 🚀 NovaSaaS — Production-Ready SaaS Platform

A full-stack, production-grade SaaS boilerplate built with modern technology and best practices.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Vanilla CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT + Google OAuth |
| Payments | Stripe (subscriptions + webhooks) |
| Containers | Docker + Docker Compose |
| CI/CD | GitHub Actions |

## Quick Start (Docker)

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd saas-platform

# 2. Copy env files
cp backend/.env.example  backend/.env
cp frontend/.env.example frontend/.env

# 3. Fill in secrets (see below)
# Edit backend/.env and frontend/.env

# 4. Start all services
docker compose up -d

# 5. Run migrations
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npx prisma db seed   # optional

# App is live:
#   Frontend  → http://localhost:3000
#   Backend   → http://localhost:4000
#   DB Studio → npx prisma studio
```

## Local Development (without Docker)

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Redis 7+

### Backend
```bash
cd backend
cp .env.example .env       # fill in your secrets
npm install
npx prisma generate
npx prisma migrate dev
npm run dev                # http://localhost:4000
```

### Frontend
```bash
cd frontend
cp .env.example .env       # fill in NEXT_PUBLIC_ vars
npm install
npm run dev                # http://localhost:3000
```

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `JWT_ACCESS_SECRET` | 32+ char secret for access tokens |
| `JWT_REFRESH_SECRET` | 32+ char secret for refresh tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret (`whsec_...`) |
| `FRONTEND_URL` | Frontend origin for CORS |

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products & prices in the Stripe dashboard
3. Copy price IDs to `STRIPE_*` env vars
4. Seed the prices into your DB (or via Prisma Studio)
5. For webhooks: use `stripe listen --forward-to localhost:4000/api/billing/webhook`

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create an OAuth 2.0 client (Web application)
3. Add `http://localhost:4000/api/auth/google/callback` as redirect URI
4. Copy client ID and secret to `.env`

## Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
```

### Backend → Railway / Render
Point to your `backend/` directory and set environment variables in the platform dashboard.

### Full Docker Deploy
```bash
docker compose -f docker-compose.yml up -d --build
```

## Project Structure

```
saas-platform/
├── frontend/               # Next.js 14 App
│   ├── app/
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Login page
│   │   ├── register/       # Register page
│   │   └── dashboard/      # Protected dashboard
│   ├── components/
│   │   └── marketing/      # Landing page sections
│   └── lib/                # API client, auth store
│
├── backend/
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── middleware/      # Auth, rate limit, errors
│       ├── routes/         # Route definitions
│       ├── services/       # Business logic
│       └── utils/          # Logger, helpers
│
├── prisma/schema.prisma    # Database schema
├── docker-compose.yml      # Dev environment
└── .github/workflows/      # CI/CD pipeline
```

## Security Checklist

- [x] JWT access tokens (15min) + rotating refresh tokens (7d, httpOnly cookies)
- [x] bcrypt password hashing (cost 12)
- [x] Helmet.js HTTP security headers
- [x] CORS restricted to frontend origin
- [x] Rate limiting on all routes (stricter on auth)
- [x] Zod input validation on all endpoints
- [x] Stripe webhook signature verification
- [x] Prisma parameterized queries (no SQL injection)
- [x] Role-based access control middleware

## License

MIT — Use freely for commercial and personal projects.
