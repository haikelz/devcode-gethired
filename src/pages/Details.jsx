import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import ErrorWhileFetch from "../components/ErrorWhileFetch";
import Loading from "../components/Loading";
import { Button } from "../components/ui/Button";
import TodoItem from "../components/ui/TodoItem";
import { DeleteConfirmModal } from "../components/ui/modal";
import { useFetch } from "../hooks";
import { tw } from "../lib/helpers/tw";
import { patchData, postData } from "../lib/utils/axiosConfig";
import {
  isEditAtom,
  isOpenModalAtom,
  isOpenModalDeleteAtom,
  titleAtom,
  todoAtom,
} from "../store";

const priorityOptions = [
  {
    id: 1,
    priority: "very-high",
  },
  {
    id: 2,
    priority: "high",
  },
  {
    id: 3,
    priority: "normal",
  },
  {
    id: 4,
    priority: "low",
  },
];

export default function Detail() {
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isEdit, setIsEdit] = useAtom(isEditAtom);
  const [newTodo, setNewTodo] = useAtom(todoAtom);

  const isOpenModalDelete = useAtomValue(isOpenModalDeleteAtom);
  const setActivityTitle = useSetAtom(titleAtom);

  const { id } = useParams();
  const { data, isLoading, isError } = useFetch([id], `/activity-groups/${id}`);

  function handleChange(e) {
    const data = { ...newTodo };
    data[e.target.name] = e.target.value;

    setNewTodo(data);
  }

  async function createNewTodo(config) {
    await postData("/todo-items", config);
  }

  const queryClient = useQueryClient();

  const createNewTodoMutation = useMutation({
    mutationFn: createNewTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: id });
    },
  });

  function handleCreate() {
    createNewTodoMutation.mutate({
      activity_group_id: id,
      title: newTodo.title,
      _comment: newTodo._comment,
    });

    setIsOpenModal(false);
  }

  async function editTodo(config) {
    await patchData(`/activity-groups/${id}`, config);
  }

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: id });
    },
  });

  function handleEdit(value) {
    setActivityTitle(value);
    editTodoMutation.mutate({ title: value });
  }

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhileFetch />;

  const todos = data.todo_items;

  return (
    <>
      <div className="py-4">
        <div data-cy="activity" className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <Link to="/">
              <button
                data-cy="todo-back-button"
                type="button"
                aria-label="todo back button"
              >
                <LazyLoadImage src="/assets/arrow-left.svg" alt="arrow left" />
              </button>
            </Link>
            <div className="flex justify-center items-center ml-5">
              {isEdit ? (
                <input
                  className="bg-none bg-transparent"
                  type="text"
                  onChange={(e) => handleEdit(e.target.value)}
                  defaultValue={data.title}
                />
              ) : (
                <h1 data-cy="activity-title" className="font-bold text-3xl">
                  {data.title}
                </h1>
              )}
              <button
                data-cy="todo-title-edit-button"
                type="button"
                aria-label="todo title edit button"
                className="ml-5"
                onClick={() => setIsEdit(!isEdit)}
              >
                <LazyLoadImage src="/assets/pencil.svg" alt="pencil" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-cy="todo-sort-button"
              type="button"
              aria-label="todo sort button"
              className={tw(
                "border border-[#E5E5E5]",
                "rounded-full w-[54px] h-[54px]",
                "flex justify-center items-center"
              )}
            >
              <LazyLoadImage src="/assets/arrow-sort.svg" alt="arrow sort" />
            </button>
            <Button
              data-cy="todo-add-button"
              className={tw(
                "bg-primary space-x-1",
                "font-semibold flex justify-center items-center"
              )}
              label="tambah"
              onClick={() => setIsOpenModal(true)}
            >
              <LazyLoadImage src="/assets/plus.svg" alt="tambah" />{" "}
              <span>Tambah</span>
            </Button>
          </div>
        </div>
        <div className="mt-10">
          {todos.length ? (
            <div className="flex flex-col justify-center items-center w-full space-y-5">
              {todos.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  comment={newTodo._comment}
                />
              ))}
            </div>
          ) : (
            <div>
              <LazyLoadImage
                effect="blur"
                data-cy="activity-empty-state"
                src="/assets/activity-empty-state.svg"
                alt="activity empty state"
              />
            </div>
          )}
        </div>
      </div>
      {isOpenModal ? (
        <div className="flex w-full min-h-screen fixed inset-0 bg-black/20 p-4 justify-center items-center">
          <div className="bg-white drop-shadow-lg sm:w-[830px] rounded-md">
            <div className="border-b-2 border-[#E5E5E5]">
              <div className="flex justify-between items-center p-4">
                <p data-cy="modal-add-title" className="text-lg font-semibold">
                  Tambah List Item
                </p>
                <button
                  data-cy="modal-add-close-button "
                  type="button"
                  aria-label="close"
                  onClick={() => setIsOpenModal(false)}
                  className="hover:bg-slate-100 p-2 rounded-md"
                >
                  <LazyLoadImage src="/assets/close.svg" />
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
                  <select
                    data-cy="modal-add-priority-dropdown"
                    onChange={handleChange}
                    name="_comment"
                    defaultValue="Pilih Priority"
                    className="mt-2 border-2 border-[#E5E5E5] bg-transparent bg-none rounded-md"
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
                onClick={handleCreate}
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {isOpenModalDelete ? <DeleteConfirmModal /> : null}
    </>
  );
}
