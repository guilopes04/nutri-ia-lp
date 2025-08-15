-- Garante unicidade do email na tabela de leads
create unique index if not exists leads_email_unique on public.leads (email);
