# PrepStats

PrepStats is a role-based SaaS platform for managing athletic statistics, awards, media uploads, and leaderboards. It empowers athletes, coaches, parents, media, organizations, and admins to collaborate and showcase performance with verified data and highlights.

---

## Features

- **Secure authentication** with role-based dashboards (Athlete, Coach, Parent, Media, Org, Admin)
- **Stat uploads and verification** (by coaches/orgs)
- **Awards management** with Stripe payments
- **Dynamic leaderboards** with filtering and sorting
- **Media uploads** (images, highlights, videos) via S3-compatible storage
- **Admin tools** for moderation and audit logs
- **Analytics integration** (Google Analytics, Sentry, Mixpanel)

---

## Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Node.js, TypeScript (REST API)
- **Database:** PostgreSQL (via Prisma ORM)
- **Object Storage:** S3-compatible (AWS or alternatives)
- **Payments:** Stripe
- **DevOps:** Vercel, GitHub Codespaces

---

## Quick Start

1. **Clone the repo:**
    ```bash
    git clone https://github.com/TeamAthletix/PrepStats.git
    cd PrepStats
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3. **Set up environment variables:**
    ```bash
    cp .env.save .env
    # Edit .env with your credentials
    ```

4. **Run database migrations:**
    ```bash
    pnpm prisma migrate dev
    ```

5. **Start the app:**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

6. Visit [http://localhost:3000](http://localhost:3000)

See [ONBOARDING.md](ONBOARDING.md) for a full step-by-step guide.

---

## Project Structure

- `/pages` — Next.js routes/dashboards
- `/api` — API endpoints
- `/prisma` — Database schema
- `/components` — UI components
- `/lib` — Utility functions
- `/data` — Seed/static data
- `/scripts` — Setup scripts

---

## Contributing

- Fork, branch, and open pull requests.
- See [ARCHITECTURE.md](ARCHITECTURE.md) for system details.
- Use [ONBOARDING.md](ONBOARDING.md) for setup and troubleshooting.
- Ask questions via Issues or Discussions!

---

## License

[MIT](LICENSE)

---

**PrepStats: Built for the next generation of athletes and teams.**