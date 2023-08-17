import { atom } from "jotai";

export const listActivityAtom = atom([{ id: "", name: "", priority: "" }]);
export const idAtom = atom(null);
export const activityTitleAtom = atom("");
export const isEditActivityTitleAtom = atom(false);
export const newTodoAtom = atom({
  activity_group_id: null,
  title: "",
  priority: "",
  is_active: 1,
});

export const isOpenAddModalAtom = atom(false);
export const isOpenDeleteModalAtom = atom(false);
export const isSortAtom = atom(false);
export const isEditTodoAtom = atom(false);
export const todoIdAtom = atom(null);
export const activityIdAtom = atom(null);
export const isDeleteAtom = atom(false);
export const todoTitleAtom = atom("");
export const isTodoDoneAtom = atom(false);
export const selectPriorityAtom = atom("");
export const isSelectPriorityAtom = atom(false);
export const sortTypeAtom = atom("terbaru");
