import { useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { isOpenDeleteModalAtom } from "../../../store";
import { Button } from "../Button";

export function ConfirmDeleteModal({ title, deleteFunc }) {
  const setIsOpenDeleteModal = useSetAtom(isOpenDeleteModalAtom);

  return (
    <div className="fixed bg-black/20 w-full flex inset-0 justify-center items-center min-h-screen">
      <div
        data-cy="modal-delete"
        className="flex bg-white rounded-xl p-10 justify-center items-center flex-col"
      >
        <LazyLoadImage
          data-cy="modal-delete-icon"
          effect="blur"
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
            label="cancel"
            onClick={() => setIsOpenDeleteModal(false)}
          >
            Batal
          </Button>
          <Button
            data-cy="modal-delete-confirm-button"
            className="bg-danger px-10"
            label="delete"
            onClick={deleteFunc}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
