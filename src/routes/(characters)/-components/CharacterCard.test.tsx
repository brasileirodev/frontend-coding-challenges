import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CharacterCard } from "./CharacterCard";
import { mockCharacter } from "../../../test/mocks";

describe("CharacterCard", () => {
  it("toggles favorite without navigating to character details", async () => {
    const onFavoriteToggle = vi.fn();
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => (
        <CharacterCard
          character={mockCharacter}
          isFavorite={false}
          onFavoriteToggle={onFavoriteToggle}
        />
      ),
    });
    const detailRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/characters/$characterId",
      component: () => <div>Character details</div>,
    });
    const router = createRouter({
      routeTree: rootRoute.addChildren([indexRoute, detailRoute]),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    await router.load();
    render(<RouterProvider router={router} />);

    await userEvent.click(screen.getByRole("button", { name: "Add Harry Potter to favorites" }));

    expect(onFavoriteToggle).toHaveBeenCalledWith("1");
    expect(router.state.location.pathname).toBe("/");
  });
});
