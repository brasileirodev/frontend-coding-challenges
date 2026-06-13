# Data Management And React Query

## Ownership

React Query is the source of truth for remote resources. Client stores may hold local preferences
or identifiers, but never duplicate fetched records, request status, or query errors.

Classify data before implementation:

- Remote asynchronous data belongs to React Query.
- URL-addressable state belongs to TanStack Router.
- Durable local-only state belongs to a client store.
- Ephemeral interaction state belongs to React components.
- Transformations belong to selectors or pure functions.

## API Boundary

Treat external JSON as `unknown`. Validate it before it reaches application code and derive domain
types from the runtime schema.

```ts
import { z } from "zod";

export const resourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["active", "inactive"]),
});

export type Resource = z.infer<typeof resourceSchema>;
```

Normalize transport-specific nullability or naming at this boundary when that creates a clearer
application model without losing meaning.

Fetchers accept an `AbortSignal`, check HTTP status, and parse the payload:

```ts
export async function fetchResource(id: string, signal?: AbortSignal) {
  const response = await fetch(`${apiUrl}/resources/${id}`, { signal });
  if (!response.ok) throw new ApiError(response.status);

  return resourceSchema.parse(await response.json());
}
```

Do not convert request failures into empty successful data. Preserve the distinction between an
error, an empty collection, and a missing entity.

## Query Keys

Build deterministic, serializable key factories near each resource:

```ts
export const resourceKeys = {
  all: ["resources"] as const,
  lists: () => [...resourceKeys.all, "list"] as const,
  list: (filters: ResourceFilters) => [...resourceKeys.lists(), filters] as const,
  details: () => [...resourceKeys.all, "detail"] as const,
  detail: (id: string) => [...resourceKeys.details(), id] as const,
};
```

Every server input read by `queryFn` must be represented in `queryKey`. Values used only to derive
client-side views from an existing response do not need a separate server cache entry.

## Query Options

Create reusable `queryOptions` factories and consume the same definition from loaders,
components, prefetch handlers, and tests:

```ts
export const resourceQueryOptions = (id: string) =>
  queryOptions({
    queryKey: resourceKeys.detail(id),
    queryFn: ({ signal }) => fetchResource(id, signal),
    staleTime: 5 * 60 * 1000,
  });
```

Choose cache behavior from product semantics:

- `staleTime`: how long cached data is considered fresh.
- `gcTime`: how long unused data stays in memory.
- `retry`: which failures are worth retrying.
- `refetchOnWindowFocus` and related options: whether visibility should refresh data.

Avoid `Infinity` or global overrides without a documented freshness requirement.

## Router Integration

Prefetch route-critical data in loaders:

```ts
loader: ({ context, params }) =>
  context.queryClient.ensureQueryData(resourceQueryOptions(params.resourceId)),
```

Subscribe in the component with the same options:

```ts
const { resourceId } = Route.useParams();
const { data } = useSuspenseQuery(resourceQueryOptions(resourceId));
```

The loader coordinates navigation readiness. The query hook owns cache observation, background
refetching, and lifecycle.

## Derivation

Apply client-only filtering, sorting, grouping, and formatting as derived transformations of query
data. Shareable controls belong to search params; durable local inputs belong to the appropriate
client store.

Do not overwrite query cache with a transformed subset unless that subset is a distinct server
resource. Prefer pure functions, query `select`, or memoization when computation cost justifies it.

## Mutations

- Use `useMutation` only for remote writes.
- Invalidate or update cache through the central key factory.
- Prefer precise invalidation over clearing unrelated query families.
- Use optimistic updates only with cancellation, snapshots, rollback, and tests.
- Keep local-only state changes as client-store actions, not fake React Query mutations.

## Official References

- [TanStack Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [TanStack Query options](https://tanstack.com/query/latest/docs/framework/react/guides/query-options)
- [TanStack Router external data loading](https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading)
