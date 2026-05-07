# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend
```bash
npm run dev        # Dev server on :3000 with hot reload
npm run build      # Production build to /dist
npm run preview    # Preview production build
```

### Full Stack (Docker)
```bash
make dev           # Build and start all containers (frontend + backend + postgres) with hot reload
docker compose up -d
docker compose logs -f
docker compose logs -f backend
```

### Backend (inside container)
```bash
docker compose exec backend python migrate_cli.py      # Run DB migrations
docker compose exec backend python subscribers_cli.py  # List newsletter subscribers
```

### Production
```bash
make prod-build    # Build production images
make prod-up       # Start production environment
make prod-logs
make prune         # Docker cleanup
```

There is no lint script and no test suite.

## Architecture

**Full-stack SPA**: React 19 (Vite) frontend + FastAPI (Python) backend + PostgreSQL 15.

```
Frontend (Vite dev :3000 / Nginx prod :80)
    ↓  /api → :8000 (proxy in vite.config.ts / nginx.conf)
Backend FastAPI (:8000) ← PostgreSQL (:5432)
```

### Frontend

- `App.tsx` — top-level routing and auth state (Google OAuth JWT stored in `localStorage` as `auth_token`)
- `index.tsx` — providers: `GoogleOAuthProvider`, `BrowserRouter`, PWA service worker
- `types.ts` — shared TypeScript types; `translations.ts` — all UI strings (uk/en/ru)
- `constants.ts` — survey configuration constants
- `db/*.ts` — test definitions as TypeScript objects (aphantasia, personality, perfectionism, YSQ, demo)
- `services/` — API layer: `ProfileService.ts` (results, AI streaming), `SurveyService.ts`, `PaddleService.ts`
- `hooks/` — `useFeatureFlags.ts` (database-driven feature toggles), SEO helpers
- `components/` — UI organized by domain: `Home/`, `Survey/`, `Results/`, `Recommendations/`, `Admin/`, `ui/` (Shadcn/Radix)

### Backend

Single file `backend/main.py` (~1500 lines) contains all FastAPI routes, Pydantic models, and business logic. Supporting files:
- `auth.py` — Google OAuth token validation + JWT issuance
- `db.py` — PostgreSQL connection pool initialization and schema migrations
- `seeders.py` — seed data for tests, badges, feature flags

### Key Data Flows

**Test submission**: Frontend collects `Answer[]` → `POST /api/save-result` with `{ test_type, answers, scores, time_spent }` → backend persists to `test_results` and updates user credits.

**AI recommendations**: `POST /api/analyze-result` → backend streams Gemini Flash responses as SSE/JSON chunks → `ProfileService.ts` handles the stream.

**Auth**: Google OAuth token → `POST /api/auth/google` → JWT returned → stored in `localStorage`.

### Multi-language

All user-facing strings use `Record<Language, string>` where `Language = 'uk' | 'en' | 'ru'`. UI strings live in `translations.ts`; question content comes from PostgreSQL as localized JSON.

### Feature Flags

Database-driven toggles managed via `GET /api/feature-flags`. Admin UI at `/admin`. Frontend uses `useFeatureFlags()` hook for conditional rendering.

### Credits

Users start with 300 credits. AI analysis costs 100 credits; first generation is free. Admin can deposit credits via `POST /api/admin/users/{user_id}/deposit`.

## Environment Variables

Copy `.env.example` to `.env`. Key variables:
- `VITE_GOOGLE_CLIENT_ID`, `AUTH_SECRET` — Google OAuth
- `GEMINI_API_KEY` — required for AI recommendations
- `DB_HOST/PORT/USER/PASSWORD` — PostgreSQL
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_GROUP_ID` — optional deploy notifications
- `ADMIN_USER_IDS` — comma-separated Google user IDs for admin access
- `VITE_BASE_URL` — canonical site URL for OG tags

## Database Migrations

Migrations are in `db.py` and run manually:
```bash
docker compose exec backend python migrate_cli.py
```
No ORM — raw SQL via `asyncpg`.
