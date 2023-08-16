import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { sortTypeAtom } from "../../store";
import { TodoItem } from "./item/TodoItem";

export default function SortedTodos({ todos }) {
  const sortType = useAtomValue(sortTypeAtom);

  const sortedTodos = useMemo(
    () =>
      [...todos].sort((a, b) => {
        if (sortType === "terbaru") return a - b;

        if (sortType === "terlama") {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        }

        if (sortType === "a-z") {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        }

        if (sortType === "z-a") {
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        }
      }),
    [todos, sortType]
  );

  return (
    <>
      {sortedTodos.length ? (
        <div className="flex flex-col justify-center items-center w-full space-y-5">
          {sortedTodos.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              data-cy={`todo-item-${index}`}
            />
          ))}
        </div>
      ) : (
        <div data-cy="todo-empty-state">
          <LazyLoadImage
            effect="blur"
            src="/assets/todo-empty-state.svg"
            alt="todo empty state"
          />
        </div>
      )}
    </>
  );
}
