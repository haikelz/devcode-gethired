import { atom } from "jotai";

export const listActivityAtom = atom([{ id: "", name: "", priority: "" }]);
export const idAtom = atom(null);
export const isOpenModalAtom = atom(false);
export const titleAtom = atom("");
export const isEditAtom = atom(false);
export const todoAtom = atom({
  activity_group_id: "",
  title: "",
  _comment: "",
});

export const isOpenModalDeleteAtom = atom(false);
