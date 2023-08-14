import { useQuery } from "@tanstack/react-query";
import { getData } from "../lib/utils/axiosConfig";

export function useFetch(keys, link) {
  return useQuery(keys, () => getData(link), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
}
