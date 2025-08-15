# Etapa de build: compila o app Vite (landing)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; elif [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm i --frozen-lockfile; elif [ -f yarn.lock ]; then yarn --frozen-lockfile; else npm i; fi

COPY . .
RUN npm run build

# Etapa de runtime: serve os estáticos com 'serve'
FROM node:20-alpine AS runtime
WORKDIR /app

RUN npm i -g serve && apk add --no-cache curl

COPY --from=builder /app/dist /app/dist

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -fsS http://127.0.0.1:8000/ || exit 1

CMD ["serve", "-s", "dist", "-l", "8000", "-n"]

