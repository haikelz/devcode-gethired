import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import ErrorWhileFetch from "../components/ErrorWhileFetch";
import Loading from "../components/Loading";
import {
  AddTodoModal,
  Button,
  ConfirmDeleteModal,
  InformationModal,
  SortDropdown,
  SortedTodos,
} from "../components/ui";
import { useFetch } from "../hooks";
import { tw } from "../lib/helpers";
import { deleteData, patchData, postData } from "../lib/utils/axiosConfig";
import {
  isDeleteAtom,
  isOpenAddTodoModalAtom,
  isOpenDeleteModalAtom,
  isSortAtom,
  newTodoAtom,
  selectPriorityAtom,
  todoIdAtom,
  todoTitleAtom,
} from "../store";

export default function Detail() {
  const { id } = useParams();

  const [isEditActivityTitle, setIsEditActivityTitle] = useState(false);
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isSort, setIsSort] = useAtom(isSortAtom);
  const [isDelete, setIsDelete] = useAtom(isDeleteAtom);
  const [selectPriority, setSelectPriority] = useAtom(selectPriorityAtom);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useAtom(
    isOpenDeleteModalAtom
  );
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useAtom(
    isOpenAddTodoModalAtom
  );

  const inputRef = useRef(null);
  const openRef = useRef(null);

  const todoId = useAtomValue(todoIdAtom);
  const todoTitle = useAtomValue(todoTitleAtom);

  const { data, isLoading, isError } = useFetch([id], `/activity-groups/${id}`);

  function handleChange(e) {
    const data = { ...newTodo };
    data[e.target.name] = e.target.value;

    setNewTodo(data);
  }

  // new todo item
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
      priority: selectPriority,
      is_active: 1,
    });

    setIsOpenAddTodoModal(false);
    setSelectPriority("");
    setNewTodo({
      activity_group_id: null,
      title: "",
      priority: "",
      is_active: 1,
    });
  }

  // edit todo item
  async function editTodo(config) {
    await patchData(`/activity-groups/${id}`, config);
  }

  const editTodoMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: id });
    },
  });

  function handleEdit(title) {
    editTodoMutation.mutate({ title: title });
  }

  // delete todo item
  async function deleteTodo() {
    await deleteData(`/todo-items/${todoId}`);
  }

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoId });
    },
  });

  function handleDelete() {
    deleteTodoMutation.mutate(todoId);

    setIsOpenDeleteModal(false);
    setIsDelete(true);
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
            <div
              ref={openRef}
              className="flex justify-center items-center ml-5"
            >
              {isEditActivityTitle ? (
                <input
                  data-cy="todo-title"
                  ref={inputRef}
                  className={tw(
                    "bg-none border-b-2 border-blue-700 py-2",
                    "w-fit bg-transparent",
                    "text-xl md:text-3xl font-bold"
                  )}
                  type="text"
                  onChange={(e) => handleEdit(e.target.value)}
                  defaultValue={data.title}
                />
              ) : (
                <h1
                  data-cy="todo-title"
                  className="font-bold text-xl md:text-3xl"
                  onClick={() => {
                    setIsEditActivityTitle(!isEditActivityTitle);
                    inputRef.current?.focus();
                  }}
                >
                  {data.title}
                </h1>
              )}
              <button
                data-cy="todo-title-edit-button"
                type="button"
                aria-label="todo title edit button"
                className="ml-5"
                onClick={() => {
                  setIsEditActivityTitle(!isEditActivityTitle);
                  inputRef.current?.focus();
                }}
              >
                <LazyLoadImage src="/assets/pencil.svg" alt="pencil" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            <div>
              <button
                data-cy="todo-sort-button"
                type="button"
                aria-label="todo sort button"
                className={tw(
                  "border border-[#E5E5E5] md:w-[54px] md:h-[54px] relative",
                  "rounded-full",
                  "flex justify-center items-center"
                )}
                onClick={() => setIsSort(!isSort)}
              >
                <LazyLoadImage src="/assets/arrow-sort.svg" alt="arrow sort" />
              </button>
              {isSort ? <SortDropdown /> : null}
            </div>
            <Button
              data-cy="todo-add-button"
              className={tw(
                "bg-primary font-semibold",
                "flex justify-center items-center",
                "md:space-x-1"
              )}
              label="tambah"
              onClick={() => setIsOpenAddTodoModal(true)}
            >
              <LazyLoadImage src="/assets/plus.svg" alt="tambah" />
              <span className="hidden md:block">Tambah</span>
            </Button>
          </div>
        </div>
        <div className="mt-10 w-full flex justify-center items-center flex-col">
          <SortedTodos todos={todos} />
        </div>
      </div>
      {isOpenAddTodoModal ? (
        <AddTodoModal handleChange={handleChange} handleCreate={handleCreate} />
      ) : null}
      {isOpenDeleteModal ? (
        <ConfirmDeleteModal title={todoTitle} deleteFunc={handleDelete} />
      ) : null}
      {isDelete ? <InformationModal /> : null}
    </>
  );
}
