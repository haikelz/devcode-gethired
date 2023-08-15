import { useAtom, useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tw } from "../../../lib/helpers";
import { getData } from "../../../lib/utils/axiosConfig";
import {
  isEditTodoAtom,
  isOpenAddModalAtom,
  isOpenDeleteModalAtom,
  newTodoAtom,
  todoIdAtom,
  todoTitleAtom,
} from "../../../store";

export function TodoItem({ item, priority }) {
  const { id, title, activity_group_id } = item;

  const [todoTitle, setTodoTitle] = useAtom(todoTitleAtom);
  const [todoId, setTodoId] = useAtom(todoIdAtom);
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isEditTodo, setIsEditTodo] = useAtom(isEditTodoAtom);
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] =
    useAtom(isOpenAddModalAtom);

  const setIsOpenDeleteModal = useSetAtom(isOpenDeleteModalAtom);

  function handleDelete() {
    setTodoTitle(title);
    setTodoId(id);
    setIsOpenDeleteModal(true);
  }

  async function handleClick() {
    const response = await getData(`/todo-items/${id}`);
    setNewTodo(response);

    setIsOpenAddTodoModal(true);
    setTodoId(id);
    setIsEditTodo(true);
  }

  return (
    <div className="w-full">
      <div className="bg-white drop-shadow-lg rounded-xl p-7">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center space-x-4">
            <input data-cy="todo-item-checkbox" type="checkbox" name="" id="" />
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
            <p data-cy="todo_item_title" className="">
              {title}
            </p>
            <button
              data-cy="todo-item-edit-button"
              type="button"
              aria-label="todo item edit button"
              onClick={() => handleClick()}
            >
              <LazyLoadImage src="/assets/pencil.svg" alt="todo item edit" />
            </button>
          </div>
          <button
            data-cy="todo-item-delete-button"
            type="button"
            aria-label="todo item delete button"
            onClick={() => handleDelete(id)}
          >
            <LazyLoadImage src="/assets/trash.svg" alt="trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
