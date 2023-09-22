import { useSetAtom } from "jotai";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tw } from "../../../lib/helpers";
import { isOpenDeleteModalAtom } from "../../../store";
import { Button } from "../Button";

export function ConfirmDeleteModal({ title, deleteFunc }) {
  const setIsOpenDeleteModal = useSetAtom(isOpenDeleteModalAtom);

  const openRef = useRef(null);

  useClickOutside(setIsOpenDeleteModal, openRef);

  return (
    <div
      data-cy="modal-delete"
      className={tw(
        "fixed bg-black/20 w-full p-4",
        "flex inset-0 justify-center items-center min-h-screen"
      )}
    >
      <div
        ref={openRef}
        className="flex text-center bg-white rounded-xl p-10 justify-center items-center flex-col"
      >
        <LazyLoadImage
          data-cy="modal-delete-icon"
          src="/assets/warning.svg"
          alt="modal delete icon"
        />
        <p data-cy="modal-delete-title" className="my-7">
          Apakah anda yakin menghapus{" "}
          <span className="font-bold text-lg">“{title}”?</span>
        </p>
        <div className="flex justify-center items-center space-x-4">
          <Button
            data-cy="modal-delete-cancel-button"
            className="bg-secondary text-[#4A4A4A] px-10"
            label="modal delete cancel button"
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Batal
          </Button>
          <Button
            data-cy="modal-delete-confirm-button"
            className="bg-danger px-10"
            label="modal delete confirm button"
            onClick={deleteFunc}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
