# syntax=docker/dockerfile:1
#
# midhunpm.in — production image (Next.js 14 standalone output)
#
# ─── How to host ─────────────────────────────────────────────────────────────
#
#   1. Build the image:
#        docker build -t midhunpm .
#
#   2. Run it:
#        docker run -d --name midhunpm -p 3000:3000 --restart unless-stopped midhunpm
#
#   3. Site is now at http://localhost:3000
#      Put Nginx/Caddy or a Cloudflare Tunnel in front for TLS + your domain.
#
# Notes:
#   - No environment variables are required. GitHub stats (/open, homepage
#     strip) are fetched from the public GitHub API at request time and
#     degrade gracefully if the network blocks them.
#   - next/font and GitHub stats need network access *during build*; both
#     fail gracefully if offline, so the build still succeeds.
#
# ─────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine AS base

# ─── deps: install node_modules ──────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ─── builder: compile the app ────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── runner: minimal production image ────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
