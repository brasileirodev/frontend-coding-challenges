import { useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import { Button, IconButton } from "@lib/components";
import { useAppStore } from "@lib/hooks/useAppStore";

export const Toolbar = () => {
  const router = useRouter();
  const routerState = useRouterState();
  const isRootRoute = routerState.location.pathname === "/";
  const setPreferredHouse = useAppStore((store) => store.setPreferredHouse);

  const handleHouseSelection = () => {
    setPreferredHouse(undefined);
    if (!isRootRoute) {
      router.navigate({ to: "/" });
    }
  };

  return (
    <div className="flex items-center justify-between bg-amber-900/15 p-4">
      <div className="flex flex-1 items-center">
        <div className="mr-4 flex w-8 items-center justify-center">
          {!isRootRoute && (
            <IconButton
              label="Go back"
              onClick={() => router.history.back()}
              className="p-1 text-amber-200 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-200"
            >
              <ArrowLeft aria-hidden="true" size={20} />
            </IconButton>
          )}
        </div>
        <h1 className="text-xl font-medium text-amber-200">The Harry Potter App</h1>
      </div>

      <Button
        variant="ghost"
        onClick={handleHouseSelection}
        className="gap-2 pr-9"
        aria-label="Change house selection"
      >
        <span className="text-sm font-medium">Change House</span>
        <Shield aria-hidden="true" size={20} />
      </Button>
    </div>
  );
};
