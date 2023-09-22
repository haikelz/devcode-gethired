import { useEffect } from "react";

export function useClickOutside(set, ref) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      set(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClickOutside]);
}
