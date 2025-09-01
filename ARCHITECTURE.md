# 🏗️ PrepStats Architecture

## 1. Tech Stack

- **Frontend:** React 18, Next.js, TypeScript, Vite (for local dev)
- **Backend:** Node.js, Express/NestJS (planned), TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Payments:** Stripe integration (awards, spotlights, premium features)
- **Object Storage:** S3-compatible (images, highlights)
- **Caching:** Redis (sessions, leaderboards, rate limiting)
- **Hosting:** Vercel (SSL, custom domains)
- **Analytics:** Google Analytics, Mixpanel, DataDog, Sentry

---

## 2. Core Entities & Data Models

- **User** (role: Athlete, Coach, Parent, Media, Fan, Organization, Admin)
- **Profile** (name, team, position, photo, stat history, awards, highlights)
- **Stat** (sport, position, game/date, metrics, verification status)
- **Award** (type, recipient, issuer, verified, promo, payment info)
- **Leaderboard** (criteria, filters, region, sport, verified stats only)

Sample Prisma type:
```prisma
model User {
  id          String   @id @default(uuid())
  email       String   @unique
  role        String
  profile     Profile?
  stats       Stat[]
  awards      Award[]
  createdAt   DateTime @default(now())
}
```

---

## 3. Routing & Page Structure

- `/` — Landing/onboarding
- `/dashboard` — Authenticated user dashboard
- `/player/profile` — Athlete profile
- `/coach/roster` — Coach team management
- `/parent/performance` — Parent analytics/dashboard
- `/media/publish` — Media verification tools
- `/org/analytics` — Organization metrics
- `/admin/roles` — GOD mode/admin panel

- `/auth/signup` — Registration
- `/onboarding` — Role setup/redirect

---

## 4. API Overview

- **Authentication:** `/api/auth` (login, signup, session)
- **Stats:** `/api/stats` (create, read, update, verify)
- **Awards:** `/api/awards` (POW, custom, payment)
- **Leaderboards:** `/api/leaderboards` (list, filter, region)
- **Profile:** `/api/profile` (view, edit)
- **Admin:** `/api/admin` (users, moderation, flags, logs)

---

## 5. Integration Points

- **Stripe:** For payments (custom awards, spotlights, voting)
- **Object Storage:** For image/highlight uploads
- **Ads:** GAM or custom ad server (geo-targeted, banner placement)
- **Analytics:** Telemetry beacon, event tracking

---

## 6. Deployment

- **Production:** Vercel, with auto-deploy from `PrepStats-main`
- **Environment:** `.env` for sensitive keys, `.env.save` as template
- **Scripts:** Setup, seed, migration in `/scripts`, `/sql`

---

## 7. Security & Compliance

- **COPPA/FERPA:** Privacy for minors, PII minimization
- **Role-based access:** Auth middleware, admin controls
- **Audit logs:** Actions, stat changes, award issuance

---

## 8. Monitoring & Success Metrics

- Stat verification time, DAU/MAU, leaderboard engagement, conversion rates, coach retention, ad fill rate

---

**For more details:** See [ONBOARDING.md](./ONBOARDING.md) and [README.md](./README.md)
