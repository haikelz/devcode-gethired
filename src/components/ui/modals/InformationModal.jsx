import { useSetAtom } from "jotai";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { isOpenInformationModalAtom } from "../../../store";

export function InformationModal() {
  const setIsOpenInformationModal = useSetAtom(isOpenInformationModalAtom);

  const openRef = useRef(null);

  useClickOutside(setIsOpenInformationModal, openRef);

  return (
    <div className="fixed bg-black/20 flex justify-center min-h-screen inset-0 items-center">
      <div
        ref={openRef}
        data-cy="modal-information"
        className="flex space-x-2 justify-center items-center bg-white px-6 py-4 rounded-xl drop-shadow-lg"
      >
        <LazyLoadImage
          data-cy="modal-information-icon"
          src="/assets/information.svg"
          alt="modal information icon"
        />
        <p data-cy="modal-information-title" className="text-sm">
          Activity berhasil dihapus!
        </p>
      </div>
    </div>
  );
}
