# Nutri Assist — Landing Page

Este é o repositório da landing page do produto Nutri Assist (Gerador de Plano Alimentar com IA).

## Scripts
- `npm i` — instalar dependências
- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build para produção
- `npm run preview` — servir build localmente

## Stack
- Vite + React + TypeScript
- Tailwind CSS

## Deploy sugerido
- Vercel, Netlify ou GitHub Pages

Para GitHub Pages:
1. Instale `gh-pages` (opcional): `npm i -D gh-pages`
2. Adicione no package.json:
   - `"homepage": "https://SEU_USUARIO.github.io/nutri-ia-landing"`
   - scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"`
3. `npm run deploy`

## Contexto de marketing
Consulte `agent.md` na raiz para briefing completo da landing.

## Leads (Supabase + Discord)
- Crie a tabela `leads` no Supabase:
```
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  source text,
  created_at timestamptz default now()
);
```
- Variáveis de ambiente (crie `.env` baseado em `.env.example`):
  - VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
  - VITE_DISCORD_WEBHOOK_URL (webhook do Discord)
- RLS: mantenha RLS desabilitado para `leads` ou crie política pública de insert somente:
```
alter table public.leads enable row level security;
create policy "allow anon inserts" on public.leads for insert to anon with check (true);
```

