# PGPR Clima

**Profesjonalny system operacyjny dla firm HVAC**

---

## Stack

- **Frontend:** Next.js 14, React 18, TypeScript (strict), Tailwind CSS, shadcn/ui base
- **Backend:** Supabase (PostgreSQL + Auth + Storage + RLS)
- **ORM:** Drizzle ORM
- **Jobs:** Trigger.dev v3
- **PDF:** @react-pdf/renderer
- **Offline:** Dexie.js (IndexedDB)
- **Payments:** Stripe (abstracted)
- **Email:** Resend (abstracted)

## Quick Start

```bash
# 1. Clone & install
pnpm install

# 2. Environment
cp .env.example .env.local
# Fill in your Supabase URL, anon key, service role key, DATABASE_URL

# 3. Database
pnpm db:push       # push schema to Supabase
pnpm db:seed       # seed demo data

# 4. Dev server
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm typecheck` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm test:run` | Unit tests |
| `pnpm db:generate` | Generate Drizzle migration |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:seed` | Seed demo data |
| `pnpm db:studio` | Drizzle Studio GUI |

## Architecture

```
src/
├── app/            # Next.js App Router
│   ├── app/        # /app — Panel firmy
│   ├── login/      # Auth pages
│   ├── technician/ # /technician — Panel technika
│   ├── portal/     # /portal — Portal klienta
│   └── api/        # API routes
├── components/
│   ├── ui/         # Design system components
│   └── layout/     # AppShell, Sidebar, Topbar
├── config/         # Navigation, constants
├── db/
│   ├── schema/     # Drizzle schema (all tables)
│   ├── migrations/ # Generated migrations
│   └── seed/       # Demo data
├── domain/         # Business logic (pure functions)
├── lib/
│   ├── supabase/   # Server & browser clients
│   └── utils.ts    # Formatting utilities
├── services/
│   └── ocr/        # OCR provider abstraction
├── styles/         # globals.css (design tokens)
└── types/          # Shared TypeScript types
```

## Design System

PGPR Clima uses a custom design system built on top of Tailwind CSS.

**Brand colors:** `pgpr-navy`, `pgpr-graphite`, `pgpr-blue`, `pgpr-ice`, `pgpr-cyan`

**Semantic tokens** via CSS custom properties — supports light + dark mode.

Sidebar is always dark (navy) regardless of app theme.

## Multi-tenancy

Every business record includes `organizationId`.
Supabase RLS policies enforce tenant isolation.
Service role key is **never** exposed to the browser.

## Offline

Dexie.js (IndexedDB) stores local copies.
Pending mutations are queued and replayed on reconnect.
Cylinder movements and refrigerant operations use append-only ledger — no naive last-write-wins.

## Security

- RBAC enforced on the server (not just hidden UI)
- Zod validation on all inputs
- Signed storage URLs for files
- HMAC webhook signatures
- Audit log for critical operations

## License

Private / Proprietary — PGPR Clima
