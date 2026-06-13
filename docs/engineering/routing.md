# TanStack Router

## Route Responsibilities

A route owns URL contracts and navigation-critical orchestration:

- path and path params;
- validated search params;
- loader dependencies and loader execution;
- pending, error, and not-found states when route-specific;
- composition of route-level UI.

Business transformations and HTTP parsing do not belong in route files.

## File-Based Routing

- `__root.tsx` provides typed router context and the application shell.
- Parenthesized directories create pathless organizational groups.
- Prefix private colocated files and folders with `-` to exclude them from route generation.
- Dynamic resources use typed path segments such as `$resourceId`.
- Never edit `src/routeTree.gen.ts`; refresh it through the router generator or build process.

## Search Params

Use search params for state a user may bookmark, share, refresh, or navigate through browser
history. Typical examples include filtering, sorting, pagination, search text, and selected views.

Validate and default values at the route boundary:

```ts
const searchSchema = z.object({
  filter: z.enum(["all", "active", "inactive"]).catch("all"),
  query: z.string().catch(""),
  page: z.coerce.number().int().positive().catch(1),
});

export const Route = createFileRoute("/(resources)/")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ResourceListView,
});
```

Consume search through `Route.useSearch()` and update it with typed navigation:

```ts
const navigate = Route.useNavigate();

navigate({
  search: (previous) => ({ ...previous, filter: "active", page: 1 }),
  replace: true,
});
```

Do not read `window.location`, manually build query strings, or cast raw search values.

## Loaders And React Query

Loaders coordinate data needed before a route renders. Reuse query option factories and the typed
`queryClient` from root context.

```ts
export const Route = createFileRoute("/(resources)/resources/$resourceId")({
  loader: async ({ context, params }) => {
    const resource = await context.queryClient.ensureQueryData(
      resourceQueryOptions(params.resourceId)
    );

    if (!resource) throw notFound();
    return resource;
  },
  component: ResourceDetailView,
  notFoundComponent: ResourceNotFound,
});
```

Use `loaderDeps` when a loader depends on validated search params. Query keys must include the same
dependencies when they affect the server request.

## Navigation

- Use typed `<Link to="..." params={...} search={...}>` for declarative navigation.
- Use `Route.useNavigate()` for imperative transitions originating in the current route.
- Use router history only when the product explicitly requires browser-history semantics.
- Provide deterministic navigation for routes that users can enter directly.
- For nested interactive controls inside a linked surface, prevent unintended navigation and
  preserve keyboard accessibility.

## Route States

- Global defaults may handle generic pending and errors.
- Missing resources are not-found states, not network errors.
- Collection routes distinguish initial loading, request error, successful empty data, and a
  client-side transformation that produces no visible results.
- Prefer route pending UI for loader-driven navigation and query indicators for background
  refreshes.

## Official References

- [TanStack Router search params](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- [TanStack Router data loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [TanStack Router external data loading](https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading)
- [TanStack Router not-found errors](https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors)
