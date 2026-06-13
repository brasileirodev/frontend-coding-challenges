import { queryOptions } from "@tanstack/react-query";
import { fetchCharacter } from "./characters";

export const characterQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["characters", "detail", id],
    queryFn: () => fetchCharacter(id),
  });
