import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tw } from "../../../lib/helpers";
import { getData, patchData } from "../../../lib/utils/axiosConfig";
import {
  isEditTodoAtom,
  isOpenAddModalAtom,
  isOpenDeleteModalAtom,
  newTodoAtom,
  todoIdAtom,
  todoTitleAtom,
} from "../../../store";

export function TodoItem({ item }) {
  const { id, title, priority, is_active } = item;

  const setTodoTitle = useSetAtom(todoTitleAtom);
  const setTodoId = useSetAtom(todoIdAtom);
  const setNewTodo = useSetAtom(newTodoAtom);
  const setIsEditTodo = useSetAtom(isEditTodoAtom);
  const setIsOpenAddTodoModal = useSetAtom(isOpenAddModalAtom);
  const setIsOpenDeleteModal = useSetAtom(isOpenDeleteModalAtom);

  const queryClient = useQueryClient();

  async function editTodoPriority(config) {
    await patchData(`/todo-items/${id}`, config);
  }

  const editTodoPriorityMutation = useMutation({
    mutationFn: editTodoPriority,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: id });
    },
  });

  function handleEditTodoPriority(value) {
    editTodoPriorityMutation.mutate({
      is_active: value,
    });
  }

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
            <input
              data-cy="todo-item-checkbox"
              type="checkbox"
              name="priority"
              onChange={(e) => {
                handleEditTodoPriority(!e.target.checked);
              }}
              checked={!is_active}
              className={tw(
                "bg-red-100 cursor-pointer",
                "border-red-300 text-red-500",
                "focus:ring-red-200"
              )}
            />
            <div
              data-cy="todo-item-priority-indicator"
              className={tw(
                "w-3 h-3 rounded-full",
                priority === "very-high"
                  ? "bg-danger"
                  : priority === "high"
                  ? "bg-[#F8A541]"
                  : priority === "medium"
                  ? "bg-[#00A790]"
                  : priority === "low"
                  ? "bg-[#428BC1]"
                  : "bg-[#8942C1]"
              )}
            ></div>
            <p
              data-cy="todo-item-title"
              className={tw(
                "text-lg font-medium",
                !is_active ? "line-through text-gray" : ""
              )}
            >
              {title}
            </p>
            <button
              data-cy="todo-item-edit-button"
              type="button"
              aria-label="todo item edit button"
              onClick={handleClick}
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
