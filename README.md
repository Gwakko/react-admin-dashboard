# React Admin Dashboard

Frontend for the Laravel API Starter — project and task management dashboard built with React, TypeScript, and Zustand. Uses **fractal architecture** with strict layer dependency rules.

## Stack

- **React 19** + TypeScript
- **Vite** — build tool
- **Zustand** + Immer — scoped stores with immutable updates
- **React Router** — client-side routing
- **Axios** — HTTP client with interceptors (auth, error handling)

## Quick Start

```bash
npm install
cp .env.example .env  # set API URL
npm run dev
```

## Fractal Architecture

Strict unidirectional dependency flow: pages → widgets → features → domain → lib.
Upper layers never import from peers or lower layers importing upward.

```
src/
├── lib/                    # Infrastructure (no business logic)
│   ├── api/                # Axios client, interceptors
│   └── zustand/            # createScopedStore, ImmerStateCreator
│
├── domain/                 # Business entities (isolated modules)
│   ├── project/            # Project domain
│   │   ├── api/            # API calls + DTO→Entity mapping
│   │   ├── store/          # Zustand store + selectors (separate files)
│   │   ├── types/          # Entity types (camelCase, no DTOs)
│   │   └── index.ts        # Public API (only entry point)
│   └── task/               # Task domain (same structure)
│
├── features/               # Use-cases (compose domain modules)
│   ├── project-list/       # useProjects, useCreateProject, useDeleteProject
│   │   └── index.ts
│   └── task-board/         # useTasks, useCompleteTask
│       └── index.ts
│
├── widgets/                # Presentational composites (no store access)
│   ├── project-table/      # ProjectTable component
│   └── task-table/         # TaskTable, StatusFilter components
│
├── layouts/                # Layout shells (MainLayout with Outlet)
│
├── pages/                  # Thin page components (composition only)
│   ├── ProjectsPage.tsx    # Composes features + widgets
│   ├── TasksPage.tsx
│   └── HomePage.tsx
│
└── App.tsx                 # Router + layout setup
```

## Layer Rules

| Layer | Can import from | Cannot import from |
|-------|----------------|-------------------|
| `lib/` | external packages only | everything in src/ |
| `domain/` | `lib/` | `features/`, `widgets/`, `pages/` |
| `features/` | `domain/`, `lib/` | `widgets/`, `pages/` |
| `widgets/` | `domain/` (types only), `components/` | `features/`, `pages/` |
| `pages/` | `features/`, `widgets/`, `domain/` (types) | peer pages |
| `layouts/` | `components/` | `domain/`, `features/`, `widgets/`, `pages/` |

## Key Patterns

- **Public API via index.ts** — domain modules are accessed only through their `index.ts`
- **DTO → Entity mapping** — snake_case API responses mapped to camelCase entities in `domain/*/api/`
- **Scoped stores** — `createScopedStore` with `ImmerStateCreator`, separate selectors files
- **Thin pages** — pages only compose features and widgets, no business logic
- **Props-driven widgets** — widgets receive data via props, no direct store access

## Connects to

- [Laravel API Starter](../laravel-api-starter) — primary backend
- [NestJS Payments API](../nestjs-payments-api) — alternative backend

## TODO

- [ ] Login/register pages
- [ ] shadcn/ui components
- [ ] Task drag-and-drop (Kanban view)
- [ ] Real-time updates via WebSocket
- [ ] E2E tests (Playwright)
