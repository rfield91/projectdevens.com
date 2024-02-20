import { Club } from "@/library/calendar/types";
import { ClubTag } from "./club-tag";

type ClubFilterProps = {
  clubs: Club[];
  deselectedFilters: string[];
  handleFilterChange: (club: string, isEnabled: boolean) => void;
};

export function ClubFilter({
  clubs,
  deselectedFilters,
  handleFilterChange,
}: ClubFilterProps) {
  return (
    <>
      <h2 className="text-center mb-2 font-medium mt-2">Clubs</h2>
      <div className="flex justify-center flex-wrap">
        {clubs.map((club) => (
          <ClubTag
            key={club.clubId}
            club={club}
            enabled={
              deselectedFilters.find((f) => f == club.clubId) === undefined
            }
            onClick={handleFilterChange}
          />
        ))}
      </div>
    </>
  );
}
