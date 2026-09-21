# ShopBot Nova

A production-grade e-commerce storefront built with React, TypeScript, and Supabase. Designed for performance, maintainability, and rapid iteration.

## Executive Summary

ShopBot Nova is a full-stack e-commerce frontend that delivers a complete online shopping experience -- from product discovery and filtering through checkout. The system is architected as a single-page application with a serverless backend, enabling zero-infrastructure-management deployment and automatic horizontal scaling.

### Problem Statement

Traditional e-commerce stacks require significant DevOps overhead and tightly coupled frontend/backend deployments. This project demonstrates a decoupled architecture where the frontend is a standalone deployable artifact and all backend concerns (auth, database, storage) are handled by managed services.

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (SPA)                     │
│  React 18 + TypeScript + Vite                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ React Router │  │ Context API  │  │ TanStack   │ │
│  │ (Routing)    │  │ (Auth/Cart)  │  │ Query      │ │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘ │
│         └────────────────┼────────────────┘        │
│                          │                          │
│              ┌───────────▼───────────┐              │
│              │   Supabase Client SDK │              │
│              └───────────┬───────────┘              │
└──────────────────────────┼──────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────┐
│                 SUPABASE (BaaS)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Auth     │  │ Postgres │  │ Row Level        │  │
│  │ (JWT)    │  │ Database │  │ Security (RLS)   │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Tech Stack & Design Decisions

| Technology | Purpose | Rationale |
|---|---|---|
| **React 18** | UI framework | Mature ecosystem, concurrent rendering, strong typing with TS |
| **TypeScript 5.5** | Type safety | Catch regressions at compile time, self-documenting interfaces |
| **Vite 5** | Build tooling | Sub-second HMR, native ESM, optimized production builds via Rollup |
| **Supabase** | Backend-as-a-Service | Auth + Postgres + RLS in one package; eliminates custom API layer |
| **TanStack React Query** | Server state | Caching, deduplication, background refetch; ready for API integration |
| **React Router 6** | Client routing | Nested layouts, route guards, code-splitting support |
| **shadcn/ui + Radix** | Component library | Accessible primitives, zero bundle bloat (copy-paste model), fully customizable |
| **Tailwind CSS 3** | Styling | Utility-first, design token system via CSS variables, dark mode built-in |
| **React Hook Form + Zod** | Form validation | Schema-based validation, minimal re-renders, type-safe form schemas |
| **ESLint 9** | Code quality | Enforces consistent patterns, catches common bugs pre-commit |

## Key Features & Production-Ready Standards

### Core Functionality
- **Product Catalog** -- Grid view with category filtering, price range slider, and sort options
- **Product Detail** -- Image gallery, color/size selectors, quantity controls, related products
- **Shopping Cart** -- Persistent via `localStorage`, real-time quantity updates, order summary
- **Authentication** -- Email/password auth with Supabase, JWT session management, auto-refresh
- **Admin Dashboard** -- Role-based access control, product CRUD operations against Supabase
- **Responsive Design** -- Mobile-first layout with dedicated mobile navigation drawer

### Performance
- Vite's native ESM dev server for instant hot module replacement
- Tree-shaken production bundles via Rollup
- Image lazy loading and optimized delivery via Unsplash CDN
- `localStorage` cart persistence eliminates unnecessary re-renders on page load

### Security
- Environment variables for Supabase credentials (never committed to VITE_ prefix pattern)
- Supabase Row Level Security (RLS) for database access control
- Admin route guards with server-side role verification
- CSRF-safe stateless JWT authentication

### Scalability
- Stateless frontend -- deploy to any CDN or static host
- Supabase handles connection pooling, auto-scaling, and backups
- Context-based state management can be swapped for Redux/Zustand without UI changes
- Component library (shadcn/ui) allows rapid feature development with consistent design

## Getting Started

### Prerequisites

- **Node.js** >= 18.x (recommend using [nvm](https://github.com/nvm-sh/nvm))
- **npm** >= 9.x (or **bun** -- `bun.lockb` is present)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shopbot-nova

# Install dependencies
npm install

# Copy environment variables (configure before running)
cp .env.example .env
```

### Environment Variables

```env
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

> **Note:** Obtain these from your [Supabase Dashboard](https://supabase.com/dashboard) under Project Settings > API.

### Development

```bash
npm run dev
# Server starts at http://localhost:8080
```

### Production Build

```bash
npm run build        # Optimized production build
npm run preview      # Preview the production build locally
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t shopbot-nova .
docker run -p 8080:80 shopbot-nova
```

## Testing & Quality Assurance

### Linting

```bash
npm run lint         # Run ESLint across the project
```

ESLint is configured with:
- `typescript-eslint` for TypeScript-specific rules
- `react-hooks` for hook dependency validation
- `react-refresh` for fast refresh compatibility

### Type Checking

```bash
npx tsc --noEmit     # Type-check without emitting files
```

### Recommended CI Checks

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## CI/CD & Deployment

### Build Pipeline

```
Push to main → Install deps → Lint → Type-check → Build → Deploy
```

### Deployment Options

| Platform | Command | Notes |
|---|---|---|
| **Vercel** | `vercel --prod` | Auto-detects Vite, zero-config |
| **Netlify** | `netlify deploy --prod` | Set build command to `npm run build` |
| **Cloudflare Pages** | `wrangler pages deploy dist` | Edge-delivered static assets |
| **AWS S3 + CloudFront** | `aws s3 sync dist/ s3://bucket` | Use for enterprise deployments |
| **Docker** | `docker build -t app .` | See Docker section above |

### Environment Configuration

- **Development** -- `.env` (local, not committed)
- **Production** -- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting platform's environment variables

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable business components (ProductCard, Newsletter, etc.)
│   ├── layout/          # App shell (Navbar, Footer, Sidebar, MobileMenu)
│   └── ui/              # shadcn/ui primitives (Button, Dialog, Toast, etc.)
├── context/             # React Context providers (Auth, Cart)
├── data/                # Static product data (migrates to Supabase)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and Supabase client initialization
├── pages/               # Route-level components (Index, Products, Cart, Auth, Admin)
├── App.tsx              # Root component with providers and routing
└── main.tsx             # Entry point
```

## License

MIT
