import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tw } from "../../../lib/helpers";
import { patchData } from "../../../lib/utils/axiosConfig";
import { priorityOptions } from "../../../lib/utils/data";
import {
  isEditTodoAtom,
  isOpenAddModalAtom,
  newTodoAtom,
  todoIdAtom,
} from "../../../store";
import { Button } from "../Button";

export function AddTodoModal({ handleChange, handleCreate }) {
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isEditTodo, setIsEditTodo] = useAtom(isEditTodoAtom);

  const todoId = useAtomValue(todoIdAtom);

  const setIsOpenAddTodoModal = useSetAtom(isOpenAddModalAtom);

  async function editTodo() {
    await patchData(`/todo-items/${todoId}`, newTodo);
  }

  const queryClient = useQueryClient();

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoId });
    },
  });

  function handleEdit() {
    editTodoMutation.mutate();

    setIsEditTodo(false);
    setIsOpenAddTodoModal(false);
    setNewTodo({ activity_group_id: null, title: "", _comment: "" });
  }

  return (
    <div className="flex w-full min-h-screen fixed inset-0 bg-black/20 p-4 justify-center items-center">
      <div className="bg-white drop-shadow-lg sm:w-[830px] rounded-md">
        <div className="border-b-2 border-[#E5E5E5]">
          <div className="flex justify-between items-center p-4">
            <p data-cy="modal-add-title" className="text-lg font-semibold">
              Tambah List Item
            </p>
            <button
              data-cy="modal-add-close-button"
              type="button"
              aria-label="close"
              onClick={() => setIsOpenAddTodoModal(false)}
              className="hover:bg-slate-100 p-2 rounded-md"
            >
              <LazyLoadImage src="/assets/close.svg" alt="close" />
            </button>
          </div>
        </div>
        <div className="border-b-2 border-[#E5E5E5]">
          <div className="pt-9 pb-4 px-6">
            <div className="flex flex-col">
              <label
                data-cy="modal-add-name-title"
                className="font-semibold text-xs"
              >
                NAMA LIST ITEM
              </label>
              <input
                data-cy="modal-add-name-input"
                type="text"
                className={tw(
                  "border-2 border-[#E5E5E5] rounded-md px-4 py-2.5 mt-2",
                  "focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
                  "placeholder:text-base placeholder:font-normal"
                )}
                placeholder="Tambahkan nama list item"
                onChange={handleChange}
                name="title"
                value={newTodo.title}
                required
              />
            </div>
            <div className="flex flex-col mt-6 w-fit">
              <label
                htmlFor="priority"
                data-cy="modal-add-priority-title"
                className="font-semibold text-xs"
              >
                PRIORITY
              </label>
              {/** TODO: jangan pake select component */}
              <button type="button" aria-label="select options">
                {/*<div
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
              ></div>*/}
                <span>Pilih priority</span>
              </button>
              <select
                data-cy="modal-add-priority-dropdown"
                onChange={handleChange}
                name="_comment"
                defaultValue="Pilih Priority"
                value={newTodo._comment}
                className="mt-2 p-2 border-2 border-[#E5E5E5] bg-transparent bg-none rounded-md"
                required
              >
                <option>Pilih Priority</option>
                {priorityOptions.map((item) => (
                  <option
                    data-cy={`modal-add-priority-${item.priority}`}
                    key={item.id}
                    value={item.priority}
                  >
                    {item.priority
                      .split(/[^A-Za-z0-9]/gi)
                      .map((item) => item[0].toUpperCase() + item.slice(1))
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center py-4 px-7">
          <Button
            data-cy="modal-add-save-button"
            className={tw(
              newTodo.title === "" ? "bg-[#16ABF8]/20" : "bg-[#16ABF8]"
            )}
            label="simpan"
            onClick={isEditTodo ? handleEdit : handleCreate}
            disabled={newTodo.title === "" ? true : false}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
