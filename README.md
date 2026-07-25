# midhunpm.in

Personal portfolio of **Midhun P M** — CS undergrad at Sahrdaya, builder of AI agents, mobile apps, and low-level C++ projects.

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · MDX · Fully static, no backend.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Verify

```bash
npm run lint
npx next build
```

## Host with Docker

The repo ships a multi-stage `Dockerfile` using Next.js standalone output:

```bash
# 1. Build the image
docker build -t midhunpm .

# 2. Run it
docker run -d --name midhunpm -p 3000:3000 --restart unless-stopped midhunpm

# 3. http://localhost:3000
```

No environment variables required. GitHub stats (the `/open` page and the
homepage numbers strip) come from the public GitHub API at request time —
if the network blocks them, those sections hide themselves instead of
showing fake numbers.

For production, put a reverse proxy (Nginx, Caddy) or a Cloudflare Tunnel
in front for TLS and the domain.

## Host on Vercel

Push to `main` and import the repo at [vercel.com/new](https://vercel.com/new) —
zero config needed, it detects Next.js automatically.

## Structure

```
app/                 Routes: /, /about, /projects(+[slug]), /blog(+[slug]), /now, /open, /uses, /contact
components/          UI — Header, Footer, cards, MDXContent, ContributionGraph, TerminalEasterEgg...
content/blog/        Blog posts (MDX + frontmatter)
content/projects/    Case studies (MDX — frontmatter is the project metadata)
lib/                 Data, types, blog/project loaders, GitHub API client
public/images/       Real photos
```
