import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tw } from "../../../lib/helpers";
import { patchData } from "../../../lib/utils/axiosConfig";
import { priorityOptions } from "../../../lib/utils/data";
import {
  isEditTodoAtom,
  isOpenAddModalAtom,
  isSelectPriorityAtom,
  newTodoAtom,
  selectPriorityAtom,
  todoIdAtom,
} from "../../../store";
import { Button } from "../Button";

export function AddTodoModal({ handleChange, handleCreate }) {
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isEditTodo, setIsEditTodo] = useAtom(isEditTodoAtom);
  const [selectPriority, setSelectPriority] = useAtom(selectPriorityAtom);
  const [isSelectPriority, setIsSelectPriority] = useAtom(isSelectPriorityAtom);

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
    setNewTodo({ activity_group_id: null, title: "", priority: "" });
  }

  function handleClose() {
    setNewTodo({ activity_group_id: null, title: "", priority: "" });
    setIsOpenAddTodoModal(false);
  }

  console.log(selectPriority);

  return (
    <div className="flex w-full min-h-screen fixed inset-0 bg-black/20 p-4 justify-center items-center">
      <div className="bg-white drop-shadow-lg sm:w-[830px] rounded-xl">
        <div className="border-b-2 border-[#E5E5E5]">
          <div className="flex justify-between items-center p-4">
            <p data-cy="modal-add-title" className="text-lg font-semibold">
              Tambah List Item
            </p>
            <button
              data-cy="modal-add-close-button"
              type="button"
              aria-label="close"
              onClick={handleClose}
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
              <div className="w-[502px]">
                <button
                  type="button"
                  aria-label="select options"
                  className={tw(
                    "border-2 border-[#E5E5E5] flex justify-between items-center relative mt-2",
                    "space-x-2 px-4 py-2 rounded-md",
                    isSelectPriority
                      ? "border-b-0 bg-[#F4F4F4] rounded-b-none"
                      : ""
                  )}
                  onClick={() => setIsSelectPriority(!isSelectPriority)}
                >
                  <span className="text-base">Pilih priority</span>
                  <LazyLoadImage
                    src={
                      isSelectPriority
                        ? `/assets/chevron-down.svg`
                        : `/assets/chevron-up.svg`
                    }
                    alt="chevron up"
                  />
                </button>
                {isSelectPriority ? (
                  <div className="absolute">
                    {priorityOptions.map((item) => (
                      <button
                        type="button"
                        aria-label="priority"
                        key={item.id}
                        className={tw(
                          "border-2 w-full border-[#E5E5E5] bg-white px-4 py-2 flex justify-between items-center",
                          item.priority === "low"
                            ? "rounded-b-lg"
                            : "border-b-0"
                        )}
                        onClick={() => setSelectPriority(item.priority)}
                      >
                        <div className="flex justify-center items-center space-x-4">
                          <div
                            data-cy="todo-item-priority-indicator"
                            className={tw(
                              "w-3 h-3 rounded-full",
                              item.priority === "very-high"
                                ? "bg-[#ED4C5C]"
                                : item.priority === "high"
                                ? "bg-[#F8A541]"
                                : item.priority === "medium"
                                ? "bg-[#00A790]"
                                : item.priority === "low"
                                ? "bg-[#428BC1]"
                                : "bg-[#8942C1]"
                            )}
                          ></div>
                          <span>
                            {item.priority === "very-high"
                              ? item.priority
                                  .replace(/[^A-Za-z0-9 ]/gi, " ")
                                  .split(" ")
                                  .map(
                                    (item) =>
                                      item[0].toUpperCase() + item.slice(1)
                                  )
                                  .join(" ")
                              : item.priority[0].toUpperCase() +
                                item.priority.slice(1)}
                          </span>
                        </div>
                        {selectPriority === item.priority ? (
                          <LazyLoadImage
                            effect="blur"
                            src="/assets/check.svg"
                            alt="check priority"
                          />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
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
