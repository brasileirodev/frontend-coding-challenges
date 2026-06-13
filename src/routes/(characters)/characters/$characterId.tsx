import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CharacterDetails } from "../-components/CharacterDetails";
import { characterQueryOptions } from "@lib/api/characters.queries";

export const Route = createFileRoute("/(characters)/characters/$characterId")({
  loader: async ({ context, params }) => {
    const character = await context.queryClient.ensureQueryData(
      characterQueryOptions(params.characterId)
    );

    if (!character) throw notFound();
    return character;
  },
  component: CharacterDetailView,
  errorComponent: CharacterDetailError,
  notFoundComponent: CharacterNotFound,
});

function CharacterDetailView() {
  const { characterId } = Route.useParams();
  const { data: character } = useSuspenseQuery(characterQueryOptions(characterId));

  if (!character) throw notFound();

  return <CharacterDetails character={character} />;
}

function CharacterDetailError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
      <h2 className="text-2xl font-bold text-[#F1DBB5]">Unable to load character details</h2>
      <p className="text-sm leading-6 text-[#F1DBB5]/60">
        The character information could not be requested. Check your connection and try again.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-yellow-600/60 px-5 py-2 text-amber-50 outline-none hover:bg-yellow-600/75 focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          Try again
        </button>
        <Link
          to="/"
          className="rounded-lg px-5 py-2 text-amber-200 outline-none hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-200"
        >
          Return to characters
        </Link>
      </div>
    </main>
  );
}

function CharacterNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
      <h2 className="text-2xl font-bold text-[#F1DBB5]">Character not found</h2>
      <p className="text-sm leading-6 text-[#F1DBB5]/60">
        This character does not exist or is no longer available.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-yellow-600/60 px-5 py-2 text-amber-50 outline-none hover:bg-yellow-600/75 focus-visible:ring-2 focus-visible:ring-amber-200"
      >
        Return to characters
      </Link>
    </main>
  );
}
