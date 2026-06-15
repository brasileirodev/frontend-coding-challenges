import { Star, UserRound } from "lucide-react";
import { InfoSection } from "@lib/components/InfoSection";
import type { Character } from "@lib/constants/characters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { formatDate } from "@lib/utils";

type CharacterDetailsProps = {
  character: Character;
};

const displayText = (value: string | null | undefined) => value || "Not available";
const displayBoolean = (value?: boolean) => {
  if (value === undefined) return "Not available";
  return value ? "Yes" : "No";
};

export const CharacterDetails = ({ character }: CharacterDetailsProps) => {
  const characterName = character.name || "Unknown character";
  const isFavorite = useAppStore((state) => state.favoriteCharacterIds.includes(character.id));
  const toggleFavoriteCharacter = useAppStore((state) => state.toggleFavoriteCharacter);
  const aliases = character.alternate_names?.join(", ") || "";
  const portrayedBy = [character.actor, ...(character.alternate_actors ?? [])]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="mx-auto w-full max-w-[872px] flex-1 px-5 pt-6 pb-12 sm:px-8 lg:pt-12">
      <div className="grid items-start gap-5 lg:grid-cols-[262px_minmax(0,1fr)]">
        <section aria-label={`${characterName} portrait`} className="mx-auto w-full max-w-[262px]">
          <div className="relative isolate h-[369px] overflow-hidden rounded-[20px] bg-zinc-950 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {character.image ? (
              <img
                src={character.image}
                alt={characterName}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#F1DBB5]/40">
                <UserRound size={72} strokeWidth={1} />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <button
              type="button"
              aria-label={`${isFavorite ? "Remove" : "Add"} ${characterName} ${
                isFavorite ? "from" : "to"
              } favorites`}
              aria-pressed={isFavorite}
              onClick={() => toggleFavoriteCharacter(character.id)}
              className="absolute top-3 right-3 z-20 rounded-full p-2 text-[#F1DBB5]/80 outline-none hover:bg-black/35 hover:text-[#F1DBB5] focus-visible:ring-2 focus-visible:ring-[#F1DBB5]"
            >
              <Star size={20} strokeWidth={1.5} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <h1 className="absolute right-3 bottom-5 left-3 text-lg font-normal text-[#F1DBB5]">
              {characterName}
            </h1>
          </div>

          {aliases && (
            <p className="font-decorative mt-3 text-base leading-[1.3] font-normal tracking-normal text-[#5C5A56]">
              Also known as: {aliases}
            </p>
          )}
        </section>

        <section className="rounded-[20px] bg-[#09090B] p-5 shadow-xl shadow-black/20 sm:p-6">
          <InfoSection
            title="Basic Information"
            icon={<img src="/user.svg" alt="" aria-hidden="true" className="h-5 w-auto shrink-0" />}
          >
            <InfoSection.Grid>
              <InfoSection.Item label="Species" value={displayText(character.species)} />
              <InfoSection.Item label="Gender" value={displayText(character.gender)} />
              <InfoSection.Item
                label="Date of birth"
                value={displayText(formatDate(character.dateOfBirth))}
              />
              <InfoSection.Item label="Ancestry" value={displayText(character.ancestry)} />
              <InfoSection.Item label="Eye color" value={displayText(character.eyeColour)} />
              <InfoSection.Item label="Hair color" value={displayText(character.hairColour)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection
            title="Magical Information"
            icon={
              <img src="/sparkles.svg" alt="" aria-hidden="true" className="h-5 w-auto shrink-0" />
            }
          >
            <InfoSection.Grid>
              <InfoSection.Item label="Wizard/Witch" value={displayBoolean(character.wizard)} />
              <InfoSection.Item label="Patronus" value={displayText(character.patronus)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection
            title="Hogwarts"
            icon={
              <img
                src="/place-of-worship.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-auto shrink-0"
              />
            }
          >
            <InfoSection.Grid>
              <InfoSection.Item label="Student" value={displayBoolean(character.hogwartsStudent)} />
              <InfoSection.Item label="Staff" value={displayBoolean(character.hogwartsStaff)} />
            </InfoSection.Grid>
          </InfoSection>

          <InfoSection.Divider />

          <InfoSection
            title="Portrayed By"
            icon={
              <img src="/book-open.svg" alt="" aria-hidden="true" className="h-5 w-auto shrink-0" />
            }
          >
            <InfoSection.Item value={displayText(portrayedBy)} />
          </InfoSection>
        </section>
      </div>
    </main>
  );
};
