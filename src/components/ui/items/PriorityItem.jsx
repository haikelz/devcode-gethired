import { LazyLoadImage } from "react-lazy-load-image-component";
import { camelCase, tw } from "../../../lib/helpers";

export function PriorityItem({ priority, selectPriority }) {
  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <div
          data-cy="todo-item-priority-indicator"
          className={tw(
            "w-3 h-3 rounded-full",
            priority === "very-high"
              ? "bg-[#ED4C5C]"
              : priority === "high"
              ? "bg-[#F8A541]"
              : priority === "medium"
              ? "bg-[#00A790]"
              : priority === "low"
              ? "bg-[#428BC1]"
              : "bg-[#8942C1]"
          )}
        ></div>
        <span>
          {priority === "very-high"
            ? camelCase(priority)
            : priority[0].toUpperCase() + priority.slice(1)}
        </span>
      </div>
      {selectPriority === priority ? (
        <LazyLoadImage src="/assets/check.svg" alt="check priority" />
      ) : null}
    </>
  );
}
