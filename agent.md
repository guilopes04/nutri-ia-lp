# Contexto para Landing Page — Nutri Assist (Gerador de Plano Alimentar com IA)

Este documento orienta a criação de uma landing page de marketing para o produto baseado no app deste repositório. Use-o como briefing para redigir copy, estruturar a página, definir CTAs e materiais de lançamento.

## 1) O Produto (em 1 frase)
Gerador de Plano Alimentar com IA que transforma dados do paciente em um plano semanal personalizado, pronto para exportar em CSV e anexar ao prontuário.

## 2) Público-alvo
- Nutricionistas autônomos e de clínicas
- Personal trainers e coaches de saúde
- Clínicas de emagrecimento e performance
- Academias/Studios que oferecem acompanhamento nutricional

## 3) Principais dores que resolvemos
- Perda de tempo montando planos personalizados manualmente
- Dificuldade em ajustar calorias conforme objetivo e nível de atividade
- Retrabalho para compilar plano em formato compartilhável (Excel/Google Sheets)
- Inconsistências no cálculo de TMB/TDEE e distribuição de refeições

## 4) Proposta de valor (benefícios)
- Velocidade: gere um plano completo em segundos
- Precisão: cálculos automáticos de TMB, TDEE, IMC e alvo calórico
- Personalização: considera objetivo, nível de atividade, preferências e restrições
- Praticidade: exporte o plano em CSV (Excel/Google Sheets) em 1 clique
- Escalabilidade: atenda mais pacientes sem perder qualidade

## 5) O que a ferramenta faz (features visíveis no app)
- Formulário com dados do paciente: nome, idade, sexo, peso, altura
- Seleções: nível de atividade (sedentário → muito intenso) e objetivo (emagrecer, manter, ganhar massa)
- Campos abertos: restrições (alergias/intolerâncias) e preferências alimentares
- Cálculos em tempo real: TMB, TDEE, IMC e alvo de calorias
- Geração de plano com IA (função “generate-plan”) e exportação em CSV
- Autenticação simples por senha (função “check-password”)

Observação técnica (para precisão da copy):
- Fórmula de TMB: Mifflin-St Jeor
- Ajuste de TDEE: fator de atividade selecionado
- Objetivo ajusta calorias: emagrecer (~-20%), ganhar massa (~+15%), manter (=TDEE)
- Saída CSV baixável com um clique

## 6) Como funciona (fluxo do usuário)
1) Profissional acessa o app e faz login por senha
2) Preenche dados do paciente e preferências
3) Visualiza métricas calculadas automaticamente (TMB, TDEE, IMC, alvo)
4) Clica em “Exportar plano alimentar”
5) Faz o download do CSV e anexa no prontuário/compartilha com o paciente

## 7) Provas e confiança (o que sugerir na landing)
- Demonstração em vídeo curto (30–60s) de todo o fluxo
- Capturas de tela das métricas e do botão “Baixar CSV”
- Depoimentos de nutricionistas (placeholder inicialmente)
- FAQ sobre IA, privacidade e adaptações do plano

## 8) Mensagens e copy sugeridas
- Headline 1: “Monte planos alimentares 10x mais rápido com IA”
- Headline 2: “Precisão nos cálculos. Personalização no atendimento.”
- Subhead: “De TMB/TDEE ao plano semanal pronto para Excel — em segundos.”
- Bullets de benefício:
  - “Planos em segundos, não em horas”
  - “Cálculo automático de TMB, TDEE, IMC e alvo calórico”
  - “Personalização por objetivo, atividade, preferências e restrições”
  - “Exportação CSV para Excel/Google Sheets”
- CTA primário: “Experimentar agora” / “Gerar meu primeiro plano”
- CTA secundário: “Ver demonstração”
- Microcopy de prova: “© {ano} Nutri Assist • IA para nutricionistas”

## 9) Estrutura da landing page (seções sugeridas)
1) Hero (headline, subhead, CTA primário + secundário, mockup)
2) Como funciona (3–5 passos com ícones do fluxo acima)
3) Benefícios (grade com bullets e mini ilustrações)
4) Demonstração (vídeo/gif do fluxo + screenshots)
5) Para quem é (nutricionistas, PTs, clínicas)
6) Perguntas frequentes (FAQ abaixo)
7) Prova social (depoimentos — iniciar com placeholders)
8) Chamada final (CTA repetido + garantia/segurança)

## 10) FAQs sugeridas
- O plano é realmente personalizado? Sim, usa dados do paciente, objetivo, atividade, restrições e preferências.
- Quais cálculos a ferramenta faz? TMB (Mifflin-St Jeor), TDEE (fator de atividade), IMC e alvo calórico.
- Posso editar o plano? Sim, exporte em CSV e edite no Excel/Google Sheets.
- Preciso de integração com prontuário? Não é obrigatório; você pode anexar o CSV manualmente. Integrações podem ser adicionadas no futuro.
- Como funciona a privacidade? Dados podem ser usados localmente para gerar o plano e exportar; recomende-se não inserir informações sensíveis além do necessário.
- Preciso de internet? Sim, a geração usa uma função de servidor (Supabase Functions).

## 11) SEO — palavras-chave e meta descrição
- Palavras-chave: “plano alimentar com IA”, “nutricionista IA”, “gerar plano alimentar”, “TMB TDEE calculadora”, “IMC”, “plano nutricional personalizado”, “exportar plano CSV”
- Meta descrição: “Gere planos alimentares personalizados com IA em segundos. Cálculo automático de TMB, TDEE e IMC, com exportação CSV. Ideal para nutricionistas, clínicas e coaches.”

## 12) CTAs e variações
- Primário: “Experimentar agora”, “Começar grátis”, “Gerar meu primeiro plano”
- Secundário: “Ver demonstração”, “Como funciona”
- Final de página: “Pronto para agilizar seus atendimentos? Gere seu primeiro plano.”

## 13) Identidade e tom
- Nome do produto exibido no app: “Nutri Assist”
- Tom: profissional, direto, confiante, acolhedor
- Visual: clean, foco em clareza de dados e ação (botões evidentes)

## 14) Materiais de apoio (para o time de marketing/design)
- Capturar screenshots reais das telas:
  - Formulário preenchido (com campos: atividade, objetivo, refeições, restrições, preferências)
  - Cartões de métricas (TMB, TDEE, IMC, Alvo calorias)
  - Botão “Exportar plano alimentar” e link “Baixar CSV”
- Gravar um screencast de 30–60s do fluxo completo
- Criar mockup do CSV aberto no Google Sheets

## 15) Recursos técnicos (contexto do app para manter a precisão da landing)
- Stack: React + Vite + TypeScript + shadcn-ui + Tailwind CSS
- Roteamento: react-router (rotas: /login e /)
- Autenticação: senha simples (Supabase Function “check-password”)
- Geração do plano: Supabase Function “generate-plan” (retorna objeto com dias)
- Exportação: conversão para CSV e download no navegador
- Métricas: TMB (Mifflin-St Jeor), TDEE (fator atividade), IMC e alvo calórico

## 16) Roadmap (opcional para mencionar como “em breve”)
- Modelos de plano por perfil (ex.: vegetariano, low carb, ganho de massa)
- Edição de plano no próprio app antes do export
- Compartilhamento por link seguro para o paciente
- Integrações com prontuários e CRMs

## 17) Diretrizes de privacidade e responsabilidade
- Não prometa diagnósticos médicos; é uma ferramenta de apoio profissional
- Oriente o uso responsável: revisão do plano por nutricionista antes de envio ao paciente
- Evite coletar dados sensíveis além do necessário

## 18) Estruturas de copy prontas (blocos reutilizáveis)
- Hero:
  - H1: “Monte planos alimentares 10x mais rápido com IA”
  - Sub: “De TMB/TDEE ao plano semanal pronto para Excel — em segundos.”
  - CTA 1: “Experimentar agora”
  - CTA 2: “Ver demonstração”
- Passos:
  1. Preencha os dados do paciente
  2. Confira as métricas calculadas (TMB, TDEE, IMC)
  3. Gere o plano personalizado com IA
  4. Baixe o CSV e compartilhe
- Chamada final:
  - “Acelere seus atendimentos sem abrir mão da personalização.”
  - CTA: “Gerar meu primeiro plano”

## 19) Direções para o time de landing (execução)
- Estrutura responsiva, carregamento rápido, sem distrações
- Repetir CTA em Header (sticky), Hero e seção final
- Incluir âncoras para “Como funciona” e “FAQ”
- Priorizar social proof (assim que disponível)
- Preparar formulário de captura (e-mail) para lista de espera ou onboarding

## 20) Dados dinâmicos úteis para demo
- Exemplo de paciente: João, 30 anos, 80 kg, 180 cm, atividade moderada, objetivo emagrecer, 4 refeições/dia, restrição lactose, preferência evitar doces
- Expectativa: métricas preenchidas e download do CSV habilitado

—
Este briefing se baseia no código atual do app (títulos, fluxo, métricas e integrações) para garantir que a landing page reflita o funcionamento real do produto.

