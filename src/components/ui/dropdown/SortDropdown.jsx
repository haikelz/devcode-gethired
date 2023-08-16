import { useAtom, useAtomValue } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { sortOptions } from "../../../lib/utils/data";
import { isSortAtom, sortTypeAtom } from "../../../store";
import { tw } from "../../../lib/helpers";

export function SortDropdown() {
  const isSort = useAtomValue(isSortAtom);
  const [sortType, setSortType] = useAtom(sortTypeAtom);

  return (
    <div className="rounded-md absolute z-50 drop-shadow-lg bg-white">
      {sortOptions.map((item) => (
        <button
          key={item.id}
          data-cy={item.cy}
          type="button"
          aria-label={item.name}
          className={tw(
            "flex justify-between w-full items-center space-x-4",
            "border-b-2 border-[#E5E5E5] py-4 px-6",
            "transition-all hover:bg-secondary"
          )}
          onClick={() => setSortType(item.name.toLowerCase())}
        >
          <div className="flex justify-center items-center space-x-4">
            <LazyLoadImage src={item.icon} alt={item.name} />
            <p className="text-[#4A4A4A] text-base">{item.name}</p>
          </div>
          {sortType === item.name.toLowerCase() ? (
            <LazyLoadImage src="/assets/check.svg" alt="check" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
