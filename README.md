# Cirquo Client

Frontend for **Cirquo**, an Apple e-commerce platform. It provides a responsive storefront, customer account flows, and a role-protected administration area.

> The storefront Home screen still uses presentation data while public catalog API integration is in progress. Admin Category, Product, and User screens already call backend APIs.

## Features

- Responsive storefront with shared header and footer.
- Zustand session store with JWT refresh handling after an authentication failure.
- Customer profile, password, and delivery-address management.
- Role-protected Admin workspace for `ADMIN` and `STAFF`.
- Admin User filtering and page pagination; User mutations are restricted to `ADMIN`.
- Admin Category and Product forms with status management, filtering, pagination, and product specifications.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript, Ant Design |
| Tooling | Vite, ESLint, Prettier |
| State | Zustand |
| Routing | React Router |
| Styling | Sass, Tailwind CSS |
| HTTP | Native `fetch` through a shared API client |

## Prerequisites

- Node.js 20+
- npm 10+
- [Cirquo Server](../cirquo-server) running on port `8080` by default

## Local setup

Install packages:

```bash
npm install
```

Create `.env` in this directory:

```env
VITE_API_BASE_URL=/api/v1
API_PROXY_TARGET=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

Vite normally serves the app at `http://localhost:5173`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run preview` | Preview the production build. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format `src` with Prettier. |
| `npm run format:check` | Check formatting without changing files. |

## Project structure

```text
src/
├── app/
│   ├── layouts/          # Store/Admin layouts and shared header/footer
│   └── router/           # Route definitions and route guards
├── features/
│   ├── admin/            # Admin dashboard, users, categories, products
│   ├── address/          # Customer address book
│   ├── auth/             # Login, registration, session store
│   ├── cart/             # Cart presentation
│   ├── home/             # Storefront landing page
│   └── profile/          # Profile and password management
├── shared/
│   ├── api/              # HTTP client and token-refresh logic
│   ├── config/           # Environment, theme, error messages
│   ├── components/       # Reusable components
│   └── styles/           # Global and responsive styles
└── images/               # Local UI assets
```

The application follows a feature-first structure: code related to a business capability stays inside its feature.

## Authentication and route protection

Authenticated API calls include:

```text
Authorization: Bearer <access-token>
```

When the backend returns error `1106`, the client tries to refresh the access token once. If refresh fails, the session is cleared and the user is redirected to login.

| Route group | Allowed roles |
| --- | --- |
| `/thong-tin-ca-nhan`, `/dia-chi` | Any authenticated user |
| `/admin/*` | `ADMIN`, `STAFF` |
| User status, role, and profile changes in Admin | `ADMIN` |

Frontend guards improve UX; authorization is still enforced by the backend.

## API integration

The shared client uses `/api/v1`; in development, Vite proxies `/api` to `API_PROXY_TARGET` to avoid local CORS issues.

Current Admin integrations:

```text
GET/PUT/PATCH       /admin/users
GET/POST/PUT/PATCH  /admin/categories
GET/POST/PUT/PATCH  /admin/products
```

Admin User and Product tables use page pagination:

```text
?page=0&size=20
```

The upcoming storefront catalog integration will use cursor pagination:

```text
/categories/{categorySlug}/products?size=4&cursor=...
```

## Roadmap

- Replace mock Home catalog data with public catalog API data.
- Complete Product Variant management for SKU, price, attributes, and stock.
- Complete Product Image management and external media storage.
- Implement cart synchronization, checkout, orders, payment, and shipping.
- Add automated frontend tests and CI checks.

## Related project

See [Cirquo Server](../cirquo-server) for API, database migration, and Swagger setup.
