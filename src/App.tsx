import React, { useState } from "react";

const sections = {
  hero: {
    title: "Monte planos alimentares 10x mais rápido com IA",
    subtitle: "De TMB/TDEE ao plano semanal pronto para Excel — em segundos.",
    ctaPrimary: "Experimentar agora",
    ctaSecondary: "Ver demonstração",
  },
  howItWorks: [
    {
      title: "1. Preencha os dados",
      desc: "Nome, idade, sexo, peso, altura, objetivo, atividade, preferências e restrições.",
    },
    {
      title: "2. Confira as métricas",
      desc: "Cálculo automático de TMB, TDEE, IMC e alvo calórico.",
    },
    {
      title: "3. Gere com IA",
      desc: "Plano semanal personalizado em poucos segundos.",
    },
    {
      title: "4. Exporte em CSV",
      desc: "Leve para Excel/Google Sheets e compartilhe.",
    },
  ],
  benefits: [
    "Planos em segundos, não em horas",
    "Cálculo automático de TMB, TDEE, IMC e alvo calórico",
    "Personalização por objetivo, atividade, preferências e restrições",
    "Exportação CSV para Excel/Google Sheets",
  ],
  faq: [
    {
      q: "O plano é realmente personalizado?",
      a: "Sim, usa dados do paciente, objetivo, atividade, restrições e preferências.",
    },
    {
      q: "Quais cálculos a ferramenta faz?",
      a: "TMB (Mifflin-St Jeor), TDEE (fator de atividade), IMC e alvo calórico.",
    },
    {
      q: "Posso editar o plano?",
      a: "Sim, exporte em CSV e edite no Excel/Google Sheets.",
    },
    {
      q: "Preciso de integração com prontuário?",
      a: "Não é obrigatório; você pode anexar o CSV manualmente.",
    },
  ],
};

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        aria-label="Abrir menu"
        className="p-2 rounded-md border hover:bg-gray-50"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full bg-white border-b shadow-sm z-20">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            <a
              href="#como-funciona"
              className="py-2"
              onClick={() => setOpen(false)}
            >
              Como funciona
            </a>
            <a
              href="#beneficios"
              className="py-2"
              onClick={() => setOpen(false)}
            >
              Benefícios
            </a>
            <a href="#contato" className="py-2" onClick={() => setOpen(false)}>
              Contato
            </a>
            <a href="#faq" className="py-2" onClick={() => setOpen(false)}>
              FAQ
            </a>
            <div className="flex gap-3 pt-1 pb-2">
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-md bg-brand text-white hover:opacity-90"
              >
                {sections.hero.ctaPrimary}
              </a>
              <a
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                Acessar
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

function sanitizeEmail(v: string) { return v.trim().toLowerCase(); }
function onlyDigits(v: string) { return v.replace(/\D+/g, ""); }
function formatBrPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6,10)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
}

function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    try {
      // 1) Inserir no Supabase
      const { supabase } = await import("./lib/supabase");

      let inserted = false;
      const { error: insertError } = await supabase.from("leads").insert(
        {
          name: name.trim(),
          email: sanitizeEmail(email),
          phone: onlyDigits(phone),
          source: "landing",
          created_at: new Date().toISOString(),
        },
        { returning: "minimal" }
      );

      if (insertError) {
        // Se já houver índice único em email, tratar 23505 (duplicate key) como não-erro
        const msg = insertError.message?.toLowerCase?.() || "";
        if (
          insertError.code === "23505" ||
          msg.includes("duplicate") ||
          insertError.details?.includes?.("already exists")
        ) {
          inserted = false;
        } else {
          throw insertError;
        }
      } else {
        inserted = true;
      }

      // 2) Notificar no Discord (usar variável de ambiente para o webhook)
      const webhook = import.meta.env.VITE_DISCORD_WEBHOOK_URL as string;
      if (webhook) {
        const duplicatedNote = inserted ? "" : " (reenvio/duplicado)";
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `Novo lead${duplicatedNote}: **${name.trim()}**\nEmail: ${sanitizeEmail(email)}\nTelefone: ${onlyDigits(phone)}`,
          }),
        });
      }

      setOk(
        inserted
          ? "Recebemos seus dados! Obrigado pelo interesse."
          : "Já temos seus dados. Avisamos nosso time do seu interesse."
      );
      setName("");
      setEmail("");
      setPhone("");
    } catch (e: any) {
      console.error(e);

      // Não exibir erro genérico se for duplicidade que passou batido
      setErr("Não foi possível enviar agora. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 grid gap-3 rounded-lg border bg-white p-4"
    >
      {ok && (
        <div className="rounded-md bg-green-50 text-green-700 px-3 py-2 text-sm">
          {ok}
        </div>
      )}
      {err && (
        <div className="rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">
          {err}
        </div>
      )}
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="lead-name">
          Nome
        </label>
        <input
          id="lead-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="rounded-md border px-3 py-2"
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="lead-email">
          E-mail
        </label>
        <input
          id="lead-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
          placeholder="voce@email.com"
          className="rounded-md border px-3 py-2"
          inputMode="email"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm" htmlFor="lead-phone">
          Telefone
        </label>
        <input
          id="lead-phone"
          required
          value={phone}
          onChange={(e) => setPhone(formatBrPhone(e.target.value))}
          placeholder="(11) 99999-9999"
          className="rounded-md border px-3 py-2"
          inputMode="numeric"
          pattern="[0-9()\s-]*"
          maxLength={16}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Quero saber mais"}
      </button>
    </form>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Nutri Assist</div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex gap-4 text-sm">
              <a href="#como-funciona" className="hover:text-brand">
                Como funciona
              </a>
              <a href="#beneficios" className="hover:text-brand">
                Benefícios
              </a>
              <a href="#contato" className="hover:text-brand">
                Contato
              </a>
              <a href="#faq" className="hover:text-brand">
                FAQ
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href="#cta"
                className="px-4 py-2 rounded-md bg-brand text-white hover:opacity-90"
              >
                {sections.hero.ctaPrimary}
              </a>
              <a
                href="/dashboard"
                className="px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                Acessar
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <MobileMenu />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand/10 to-brandAlt/10">
          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {sections.hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {sections.hero.subtitle}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#cta"
                  className="px-5 py-3 rounded-md bg-brand text-white hover:opacity-90"
                >
                  {sections.hero.ctaPrimary}
                </a>
                <a
                  href="/dashboard"
                  className="px-5 py-3 rounded-md border hover:bg-gray-50"
                >
                  Acessar
                </a>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Demonstração</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border p-4">
                  <div className="text-xs uppercase text-gray-500">TMB</div>
                  <div className="text-xl font-semibold mt-1">1.800 kcal</div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-xs uppercase text-gray-500">TDEE</div>
                  <div className="text-xl font-semibold mt-1">2.300 kcal</div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-xs uppercase text-gray-500">IMC</div>
                  <div className="text-xl font-semibold mt-1">24,7</div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-xs uppercase text-gray-500">Alvo</div>
                  <div className="text-xl font-semibold mt-1">1.840 kcal</div>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full px-4 py-2 rounded-md bg-brand text-white">
                  Exportar plano (CSV)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Como funciona</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {sections.howItWorks.map((step) => (
              <div key={step.title} className="rounded-lg border p-5 bg-white">
                <div className="font-medium">{step.title}</div>
                <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-semibold">Benefícios</h2>
            <ul className="mt-6 grid md:grid-cols-2 gap-3 list-disc pl-6">
              {sections.benefits.map((b) => (
                <li key={b} className="text-gray-700">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contato / Lead */}
        <section id="contato" className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Entre em contato
          </h2>
          <p className="mt-2 text-gray-600">
            Deixe seus dados e nós entraremos em contato.
          </p>
          <LeadForm />
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Perguntas frequentes
          </h2>
          <div className="mt-6 space-y-4">
            {sections.faq.map((f) => (
              <details key={f.q} className="rounded-md border bg-white p-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section id="cta" className="bg-brand text-white">
          <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold">
                Pronto para agilizar seus atendimentos?
              </h3>
              <p className="mt-2 text-white/90">
                Gere seu primeiro plano em segundos.
              </p>
            </div>
            <div className="flex md:justify-end">
              <a
                href="/dashboard"
                className="px-6 py-3 rounded-md bg-white text-brand font-medium hover:opacity-90"
              >
                Acessar
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Nutri Assist • IA para nutricionistas
        </div>
      </footer>
    </div>
  );
}
