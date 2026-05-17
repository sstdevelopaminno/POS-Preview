# POS Platform (Multi-tenant)

Production-oriented monorepo for a noodle shop and small restaurant POS platform.

## Stack
- Monorepo: pnpm workspaces + Turbo
- Web apps: Next.js 16 App Router + TypeScript
- Database/Auth: Supabase (PostgreSQL + RLS)
- Shared contracts: TypeScript packages for Android POS and web modules

## Repository structure

```text
pos-platform/
- apps/
  - backoffice-web/      # Back Office + IT Admin + API contracts + POS preview
  - qr-login-web/        # QR/PIN login web
  - pos-android/         # Placeholder docs + API contract reference
- packages/
  - shared-types/        # Shared domain types and API payload contracts
  - pos-domain/          # Business rules and policy guards
  - ui/                  # Reusable UI primitives
- supabase/
  - migrations/
  - seeds/
  - seed.sql
  - rls-policies.sql
```

## Business coverage included
- POS sales/orders/receipts
- Dine-in table flows and takeaway
- Manual delivery channels (Grab, LINE MAN, Shopee, Merchant App, Other)
- Cash and bank transfer payment models
- Product/ingredient/recipe/stock movement models
- Shift open/close with mismatch and unpaid bill guardrails
- Staff/manager/owner/it_admin role model
- Back office and IT admin UI routes
- Audit logging foundation
- QR and PIN login preview flow

## Important rule enforcement
Implemented in domain logic + SQL triggers:
- Staff cannot self-cancel bills
- Bill cancellation requires manager/owner PIN approval
- Stock adjustment requires manager/owner PIN approval
- Shift close with unpaid dine-in bills or cash mismatch requires manager/owner override
- Recipe-based stock deduction hook (`app.consume_ingredient`) with stock movements

## Setup

1. Install dependencies
```bash
pnpm install
```

2. Configure environment files
- Copy `apps/backoffice-web/.env.example` to `apps/backoffice-web/.env.local`
- Copy `apps/qr-login-web/.env.example` to `apps/qr-login-web/.env.local`

3. Apply Supabase migrations
```bash
supabase db reset
# or
supabase db push
```

4. Seed demo data
```bash
psql "$SUPABASE_DB_URL" -f supabase/seed.sql
```

5. Run apps
```bash
pnpm dev
```

- Back Office: `http://localhost:3000`
- QR Login: `http://localhost:3001`

## Key docs
- `docs/database-schema-plan.md`
- `docs/rls-policy-plan.md`
- `docs/api-route-design.md`
- `docs/ui-route-structure.md`

## API contract handoff for Android
- `GET /api/contracts`
- Shared TS contracts in `packages/shared-types`

## Current implementation status
This scaffold is production-oriented in architecture and separation of concerns, with working route surfaces and enforceable schema constraints. Before go-live, complete:
- Full Supabase auth claim mapping and secure PIN hash verification
- End-to-end tests for shift close and approval flows
- Receipt printing integration and tax formatting
- Observability, rate limiting, and backup/restore policy
