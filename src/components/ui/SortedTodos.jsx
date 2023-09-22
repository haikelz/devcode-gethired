import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import slugify from "slugify";
import { isOpenAddTodoModalAtom, sortTypeAtom } from "../../store";
import { TodoItem } from "./items/TodoItem";

export function SortedTodos({ todos }) {
  const sortType = useAtomValue(sortTypeAtom);

  const setIsOpenAddTodoModal = useSetAtom(isOpenAddTodoModalAtom);

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
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          return 0;
        }

        if (sortType === "z-a") {
          if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          return 0;
        }

        if (slugify(sortType) === "belum-selesai") {
          return b.is_active - a.is_active;
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
        <div
          data-cy="todo-empty-state"
          onClick={() => setIsOpenAddTodoModal(true)}
          className="cursor-pointer"
        >
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
