import clsx from "clsx";
import { twMerge } from "tw-merge";

export const tw = (...classes) => twMerge(clsx(...classes));
