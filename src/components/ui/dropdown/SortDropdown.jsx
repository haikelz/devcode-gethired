import { sortOptions } from "../../../lib/utils/data";

export function SortDropdown() {
  return (
    <div className="rounded-xl drop-shadow-lg fixed">
      {sortOptions.map((item) => (
        <div key={item.id} className="">
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
