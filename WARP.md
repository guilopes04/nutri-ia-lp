# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project summary
- Vite + React + TypeScript app styled with Tailwind CSS
- Lead capture integrates directly with Supabase (table: public.leads) and optionally posts to a Discord webhook

Common commands
- Install deps: npm i
- Dev server: npm run dev
- Build production bundle: npm run build
- Preview local build: npm run preview
- Lint: npm run lint
- Lint (auto-fix): npm run lint:fix
- Format: npm run format
- Check formatting: npm run format:check

Notes
- There are no lint/test scripts defined in package.json.
- Env vars are consumed via Vite (VITE_*). Create a .env (from .env.example if present) with:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_DISCORD_WEBHOOK_URL (optional)

High-level architecture
- Entry: src/main.tsx creates the React root and renders <App />; global styles from ./index.css
- UI: src/App.tsx defines the entire landing page structure (hero, how-it-works, benefits, lead form, FAQ, footer)
  - LeadForm handles submission flow:
    1) Lazy-imports Supabase client from ./lib/supabase
    2) Checks for existing lead by email; if found, only notifies Discord (marked as duplicate) and returns success
    3) If not found, inserts a new row into public.leads with name/email/phone/source/created_at
    4) Posts a Discord message when VITE_DISCORD_WEBHOOK_URL is set
  - Basic input helpers sanitize email and format Brazilian phone numbers client-side
- Data layer: src/lib/supabase.ts instantiates a Supabase client from VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
  - If env vars are missing, it only warns in console and uses placeholders to avoid breaking builds
- Build tooling:
  - vite.config.ts uses @vitejs/plugin-react
  - tsconfig.json targets ES2020, strict mode, JSX via react-jsx, bundler resolution
  - Tailwind: tailwind.config.js scans index.html and src/**/*.{ts,tsx}; custom brand colors; @tailwindcss/typography plugin; postcss.config.js enables tailwindcss and autoprefixer

Environment and backend setup (from README)
- Create Supabase table public.leads:
  create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    phone text,
    source text,
    created_at timestamptz default now()
  );
- Row Level Security: either keep disabled for leads, or enable and add an anon insert policy:
  alter table public.leads enable row level security;
  create policy "allow anon inserts" on public.leads for insert to anon with check (true);
- Discord webhook: set VITE_DISCORD_WEBHOOK_URL to notify on new leads

Deploy notes (from README)
- Suggested hosts: Vercel, Netlify, or GitHub Pages
- For GitHub Pages, add homepage and deploy scripts using gh-pages as described in README.md

Additional context
- README.md includes a marketing/briefing reference to agent.md for messaging; consult if needed for content tweaks

