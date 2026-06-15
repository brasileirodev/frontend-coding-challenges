# Frontend Architecture

## Purpose

This document defines architecture and dependency rules for future implementation. It describes
responsibilities and decision criteria without prescribing product features or domain models.

## Runtime Stack

- React and Vite
- TypeScript in strict, no-emit, bundler-resolution mode
- TanStack Router with file-based route generation
- TanStack React Query for server state
- Zustand with persistence for durable client state
- Zod for runtime boundary validation
- Tailwind CSS, `clsx`, and `tailwind-merge` for styling
- Vitest and React Testing Library for tests

## Project Shape

```text
src/
  lib/
    api/          HTTP boundaries, schemas, and query definitions
    components/   shared Atomic Design UI (atoms, molecules, and proven shared organisms)
    constants/    shared finite values
    hooks/        application-wide client behavior
    utils/        shared pure helpers
  routes/
    __root.tsx    router context and application shell
    -components/  components shared by routes
    (group)/      pathless organizational group
      route.tsx
      -components/
      -hooks/
  test/           shared setup and fixtures
```

Files or directories prefixed with `-` are excluded from TanStack file-route generation. Route
groups in parentheses organize files without adding a URL segment.

## Dependency Direction

```text
route -> route-local UI/hooks -> shared lib
route loader/component -> query options -> API boundary -> external API
shared UI -> shared utilities/types
```

Shared `lib` code must not import route-local modules. API modules must not depend on React,
router state, or Zustand.

## State Boundaries

| State kind     | Owner                 | Generic examples                          |
| -------------- | --------------------- | ----------------------------------------- |
| Remote/server  | React Query           | collections, entities, request status     |
| URL/navigation | TanStack Router       | filters, sorting, search, pagination      |
| Durable client | Zustand persist       | preferences and local persisted choices   |
| Ephemeral UI   | React component       | open popover, transient draft state       |
| Derived        | computation/selectors | filtered collections and formatted values |

Do not synchronize the same value across owners. Do not mirror query data in a client store or
hide shareable navigation state only in component state.

## Architectural Conventions

- Provide a single `QueryClient` to React Query and router context.
- Type root route context with `createRootRouteWithContext`.
- Keep route-private modules colocated in route-excluded directories.
- Classify shared UI with Atomic Design and follow `ui-components.md` for promotion and API rules.
- Extend native HTML attributes when building reusable primitives.
- Use the shared class-merging helper for conditional Tailwind classes.
- Keep network parsing, cache definitions, navigation contracts, and rendering responsibilities
  separated.

## Reverse-Engineering Rule

Classify findings before turning existing code into guidance:

- **Established convention:** repeated, coherent, and supported by the toolchain.
- **Local implementation choice:** valid but specific to one use case.
- **Technical debt or defect:** conflicts with type safety, cache correctness, URL semantics,
  boundary validation, accessibility, or test isolation.

Only established conventions become repository rules. Product behavior, current domain names,
and feature-specific workflows remain outside these architecture documents.

## Change Placement

- New route: create a file route and colocate its private UI and hooks.
- New API resource: add schema, fetcher, query keys/options, then route integration.
- New shareable navigation control: add it to the route search schema and typed navigation.
- New durable client preference: add a focused store state/action and persistence test.
- New generic UI primitive: add it to `src/lib/components` only after reuse is demonstrated.
- New shared UI: place it in the lowest Atomic Design layer that matches its dependencies; keep
  feature orchestration beside the route.
