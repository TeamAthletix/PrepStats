# 🏈 PrepStats

**PrepStats** is an intuitive web and mobile platform for athletes, coaches, parents, and media to track, verify, and showcase athletic statistics.  
Built for rapid onboarding, verified stat tracking, awards, leaderboards, and monetization—PrepStats empowers the high school sports community.

## 🌟 MVP Features

- **User Accounts & Roles:** Athlete, Coach, Parent, Media, Fan, Organization, Admin
- **Athlete Profiles:** Name, team, position, photo, stat history, awards, highlights
- **Stat Entry & Tracking:** Simple forms for Football and Girls Flag Football; extensible for more sports
- **Stat Verification:** Coach/media approval workflow; admin panel for moderation
- **Leaderboards:** Ranked by verified stats, filterable by sport, position, region
- **Awards:** Player of the Week (free for coaches), custom awards (paid, promo), highlights
- **Monetization:** Geo-targeted ads, spotlight banners, extra POW votes, gameday edits
- **Mobile-First Design:** Responsive, accessible, energetic (red/white/black/charcoal palette)

## 🚩 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/TeamAthletix/PrepStats.git
cd PrepStats
```

### 2. Install dependencies
```bash
pnpm install
# OR
npm install
```

### 3. Environment setup
Copy `.env.save` to `.env` and update sensitive keys:
```bash
cp .env.save .env
# Edit .env with your DB, Stripe, and API keys
```

### 4. Database setup
(Optional if using Prisma)
```bash
pnpx prisma migrate dev
pnpx prisma generate
```

### 5. Run the app
```bash
pnpm dev
# OR
npm run dev
```
App should be live at [http://localhost:3000](http://localhost:3000)

### 6. Vercel Deployment
Push to `PrepStats-main` to trigger production build/deploy.  
Check [vercel.json](./vercel.json) for config.

## 🗂️ Repo Structure

```
/components   # React UI components
/pages        # Next.js route pages
/src          # Main app logic
/prisma       # Database models (Prisma)
/data         # Static/sample data
/sql          # SQL schema/migrations
/lib          # Utilities/helpers
/scripts      # Custom scripts
```

## 📋 Docs & Onboarding

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Tech stack, data models, routing, API overview
- [ONBOARDING.md](./ONBOARDING.md) — User/role flows, verification, admin panel, MVP checklist

## 🛠️ Terminal Commands

```bash
# Sync with main branch
git fetch origin
git checkout PrepStats-main
git pull origin PrepStats-main

# Add, commit, and push changes
git add .
git commit -m "Describe changes"
git push origin PrepStats-main

# Create and push feature branch
git checkout -b feature/athlete-profile
git push origin feature/athlete-profile
```

## 🧩 Contributing

1. Fork the repo & create your branch
2. Commit descriptive messages
3. Open PRs to `PrepStats-main`
4. Tag issues with MVP priorities

## 🏆 MVP Success Metrics

- Median stat time-to-verify < 24h
- >85% stats verified in 48h
- High DAU/MAU engagement
- Strong leaderboard CTR
- >10% spotlight conversion
- >80% coach retention
- Optimized ad fill rate/eCPM

---

**Questions or feedback?**  
Open an issue or email [teamathletix@gmail.com](mailto:teamathletix@gmail.com)
