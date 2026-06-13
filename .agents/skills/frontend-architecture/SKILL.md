---
name: frontend-architecture
description: Implement or review frontend architecture using React, TanStack Router, TanStack React Query, Zustand, Zod, and strict TypeScript. Use for new routes, loaders, search params, remote data, cache design, client state, API boundaries, components, or tests in this repository, regardless of product feature or domain.
---

# Frontend Architecture

## Workflow

1. Read `/AGENTS.md` and the relevant files under `/docs/engineering/`.
2. Inspect the affected route, local modules, shared boundaries, and nearby tests.
3. Classify every value before coding:
   - server state -> React Query;
   - shareable navigation state -> TanStack Router search params;
   - durable client state -> Zustand persist;
   - ephemeral UI -> local React state;
   - derived value -> pure computation or selector.
4. Define or update boundary schemas and query option factories before UI consumption.
5. For route-critical data, integrate query options through a typed route loader.
6. Validate params and search at the route boundary; use typed links and navigation.
7. Colocate route-private code in `-components` or `-hooks`; promote code to `src/lib` only when
   genuinely shared or when it represents an application boundary.
8. Add focused tests for changed contracts and observable behavior.
9. Run `pnpm typecheck`, `pnpm test`, and `pnpm build`.
10. For UI work, run `pnpm dev` and verify the affected route in a browser.

## Required Reading By Task

- Architecture, responsibilities, or file placement: `/docs/engineering/architecture.md`
- Fetching, caching, mutations, derivation, or state ownership:
  `/docs/engineering/data-management.md`
- Routes, loaders, navigation, params, or search params:
  `/docs/engineering/routing.md`
- Types, component contracts, or tests:
  `/docs/engineering/typescript-and-testing.md`

## Guardrails

- Infer patterns from architecture principles, not product-specific examples.
- Do not edit `src/routeTree.gen.ts` manually.
- Do not duplicate React Query data in a client store.
- Do not hide shareable navigation state in component-only state.
- Do not omit server request dependencies from query keys.
- Do not trust external JSON without runtime validation.
- Do not bypass strict TypeScript with `any`, unchecked assertions, or suppressions.
