git init
git add .
git commit -m "Phase 2 Core MVP: stats (games, entries, verifications) + MVP UI scaffolding"
Usage notes:

Apply the SQL in your Supabase Studio (SQL Editor) using sql/migrations/phase2_core_mvps.sql contents.
Install dependencies and run the app locally:
npm install
npm run dev
Seed Alabama data (optional, with env vars set for Supabase service keys):
npx tsx scripts/import-alabama-schools.ts
Endpoints to test (Phase 2 core MVP):
POST /api/stats/entries
POST /api/stats/verify
GET /api/leaderboard
