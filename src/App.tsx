import React from 'react'

const sections = {
  hero: {
    title: 'Monte planos alimentares 10x mais rápido com IA',
    subtitle: 'De TMB/TDEE ao plano semanal pronto para Excel — em segundos.',
    ctaPrimary: 'Experimentar agora',
    ctaSecondary: 'Ver demonstração',
  },
  howItWorks: [
    { title: '1. Preencha os dados', desc: 'Nome, idade, sexo, peso, altura, objetivo, atividade, preferências e restrições.' },
    { title: '2. Confira as métricas', desc: 'Cálculo automático de TMB, TDEE, IMC e alvo calórico.' },
    { title: '3. Gere com IA', desc: 'Plano semanal personalizado em poucos segundos.' },
    { title: '4. Exporte em CSV', desc: 'Leve para Excel/Google Sheets e compartilhe.' },
  ],
  benefits: [
    'Planos em segundos, não em horas',
    'Cálculo automático de TMB, TDEE, IMC e alvo calórico',
    'Personalização por objetivo, atividade, preferências e restrições',
    'Exportação CSV para Excel/Google Sheets',
  ],
  faq: [
    { q: 'O plano é realmente personalizado?', a: 'Sim, usa dados do paciente, objetivo, atividade, restrições e preferências.' },
    { q: 'Quais cálculos a ferramenta faz?', a: 'TMB (Mifflin-St Jeor), TDEE (fator de atividade), IMC e alvo calórico.' },
    { q: 'Posso editar o plano?', a: 'Sim, exporte em CSV e edite no Excel/Google Sheets.' },
    { q: 'Preciso de integração com prontuário?', a: 'Não é obrigatório; você pode anexar o CSV manualmente.' },
  ],
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Nutri Assist</div>
          <nav className="flex gap-4 text-sm">
            <a href="#como-funciona" className="hover:text-brand">Como funciona</a>
            <a href="#beneficios" className="hover:text-brand">Benefícios</a>
            <a href="#faq" className="hover:text-brand">FAQ</a>
          </nav>
          <a href="#cta" className="px-4 py-2 rounded-md bg-brand text-white hover:opacity-90">
            {sections.hero.ctaPrimary}
          </a>
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
                <a href="#cta" className="px-5 py-3 rounded-md bg-brand text-white hover:opacity-90">
                  {sections.hero.ctaPrimary}
                </a>
                <a href="#demo" className="px-5 py-3 rounded-md border hover:bg-gray-50">
                  {sections.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="text-sm text-gray-500">Demonstração (mockup)</div>
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
                <button className="w-full px-4 py-2 rounded-md bg-brand text-white">Exportar plano (CSV)</button>
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
                <li key={b} className="text-gray-700">{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Perguntas frequentes</h2>
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
              <p className="mt-2 text-white/90">Gere seu primeiro plano em segundos.</p>
            </div>
            <div className="flex md:justify-end">
              <a href="#" className="px-6 py-3 rounded-md bg-white text-brand font-medium hover:opacity-90">
                {sections.hero.ctaPrimary}
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
  )
}

