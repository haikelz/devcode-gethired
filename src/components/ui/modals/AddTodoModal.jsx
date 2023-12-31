import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tw } from "../../../lib/helpers";
import { patchData } from "../../../lib/utils/axiosConfig";
import { priorityOptions } from "../../../lib/utils/data";
import {
  isEditTodoAtom,
  isOpenAddTodoModalAtom,
  isSelectPriorityAtom,
  newTodoAtom,
  selectPriorityAtom,
  todoIdAtom,
} from "../../../store";
import { Button } from "../Button";
import { PriorityItem } from "../items";

export function AddTodoModal({ handleChange, handleCreate }) {
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isEditTodo, setIsEditTodo] = useAtom(isEditTodoAtom);
  const [selectPriority, setSelectPriority] = useAtom(selectPriorityAtom);
  const [isSelectPriority, setIsSelectPriority] = useAtom(isSelectPriorityAtom);

  const setIsOpenAddTodoModal = useSetAtom(isOpenAddTodoModalAtom);

  const todoId = useAtomValue(todoIdAtom);

  const openRef = useRef(null);

  async function editTodo() {
    await patchData(`/todo-items/${todoId}`, {
      activity_group_id: newTodo.activity_group_id,
      title: newTodo.title,
      priority: selectPriority ? selectPriority : newTodo.priority,
      is_active: newTodo.is_active,
    });
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
    setSelectPriority("");
    setNewTodo({
      activity_group_id: null,
      title: "",
      priority: "",
      is_active: 1,
    });
  }

  function handleClose() {
    setNewTodo({
      activity_group_id: null,
      title: "",
      priority: "",
      is_active: 1,
    });

    setIsEditTodo(false);
    setIsOpenAddTodoModal(false);
    setSelectPriority("");
    setIsSelectPriority(false);
  }

  function handleSelectPriority(priority) {
    setSelectPriority(priority);
    setIsSelectPriority(false);
  }

  useClickOutside(setIsOpenAddTodoModal, openRef);

  return (
    <>
      <div
        className={tw(
          "flex w-full min-h-screen fixed inset-0",
          "bg-black/20 p-4 justify-center items-center"
        )}
      >
        <div
          data-cy="modal-add"
          ref={openRef}
          className="bg-white drop-shadow-lg w-full sm:w-[830px] rounded-xl"
        >
          <div className="border-b-2 border-[#E5E5E5]">
            <div className="flex justify-between items-center p-4">
              <p data-cy="modal-add-title" className="text-lg font-semibold">
                Tambah List Item
              </p>
              <button
                data-cy="modal-add-close-button"
                type="button"
                aria-label="modal add close button"
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
                  data-cy="modal-add-priority-title"
                  className="font-semibold text-xs"
                >
                  PRIORITY
                </label>
                <div
                  data-cy="modal-add-priority-dropdown"
                  className="w-[202px]"
                >
                  <button
                    type="button"
                    aria-label="select options"
                    className={tw(
                      "border-2 border-[#E5E5E5]",
                      "flex justify-between w-full items-center relative mt-2",
                      "space-x-2 px-4 py-2 rounded-md",
                      isSelectPriority
                        ? "border-b-0 bg-[#F4F4F4] rounded-b-none"
                        : ""
                    )}
                    onClick={() => setIsSelectPriority(!isSelectPriority)}
                  >
                    {selectPriority ? (
                      <PriorityItem
                        priority={selectPriority}
                        selectPriority={selectPriority}
                      />
                    ) : (
                      <>
                        <span className="text-base">
                          {isEditTodo ? (
                            <PriorityItem
                              priority={newTodo.priority}
                              selectPriority={selectPriority}
                            />
                          ) : (
                            "Pilih Priority"
                          )}
                        </span>
                        <LazyLoadImage
                          src={
                            isSelectPriority
                              ? `/assets/chevron-down.svg`
                              : `/assets/chevron-up.svg`
                          }
                          alt="chevron up"
                        />
                      </>
                    )}
                  </button>
                  {isSelectPriority ? (
                    <div className="absolute w-[202px]">
                      {priorityOptions.map((item) => (
                        <button
                          type="button"
                          aria-label="priority"
                          key={item.id}
                          className={tw(
                            "border-2 w-full border-[#E5E5E5] bg-white",
                            "px-4 py-2 space-x-4 flex justify-between items-center",
                            item.priority === "low"
                              ? "rounded-b-lg"
                              : "border-b-0"
                          )}
                          onClick={() => handleSelectPriority(item.priority)}
                        >
                          <PriorityItem
                            priority={item.priority}
                            selectPriority={selectPriority}
                          />
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
                "px-8",
                isEditTodo === false &&
                  (newTodo.title === "" || selectPriority === "")
                  ? "bg-primary/20"
                  : "bg-primary"
              )}
              label="simpan"
              onClick={isEditTodo ? handleEdit : handleCreate}
              disabled={
                isEditTodo === false &&
                (newTodo.title === "" || selectPriority === "")
                  ? true
                  : false
              }
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
