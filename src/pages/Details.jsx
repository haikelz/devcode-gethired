import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import ErrorWhileFetch from "../components/ErrorWhileFetch";
import Loading from "../components/Loading";
import {
  AddTodoModal,
  Button,
  ConfirmDeleteModal,
  InformationModal,
  TodoItem,
} from "../components/ui";
import { useFetch } from "../hooks";
import { tw } from "../lib/helpers";
import { deleteData, patchData, postData } from "../lib/utils/axiosConfig";
import {
  activityTitleAtom,
  isDeleteAtom,
  isEditActivityTitleAtom,
  isEditTodoAtom,
  isOpenAddModalAtom,
  isOpenDeleteModalAtom,
  isSortAtom,
  newTodoAtom,
  todoIdAtom,
  todoTitleAtom,
} from "../store";

export default function Detail() {
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  const [isSort, setIsSort] = useAtom(isSortAtom);
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] =
    useAtom(isOpenAddModalAtom);
  const [isEditActivityTitle, setIsEditActivityTitle] = useAtom(
    isEditActivityTitleAtom
  );
  const [todoId, setTodoId] = useAtom(todoIdAtom);
  const [isEditTodo, setIsEditTodo] = useAtom(isEditTodoAtom);
  const [isDelete, setIsDelete] = useAtom(isDeleteAtom);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useAtom(
    isOpenDeleteModalAtom
  );

  const todoTitle = useAtomValue(todoTitleAtom);
  const setActivityTitle = useSetAtom(activityTitleAtom);

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

    setIsOpenAddTodoModal(false);
    setNewTodo({ activity_group_id: null, title: "", _comment: "" });
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

    setTimeout(() => {
      setIsDelete(false);
    }, 1500);
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
              {isEditActivityTitle ? (
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
                onClick={() => setIsEditActivityTitle(!isEditActivityTitle)}
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
              onClick={() => setIsSort(!isSort)}
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
              onClick={() => setIsOpenAddTodoModal(true)}
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
