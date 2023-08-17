import { LazyLoadImage } from "react-lazy-load-image-component";

export function InformationModal() {
  return (
    <div className="fixed bg-black/20 flex justify-center min-h-scree inset-0 items-center">
      <div className="flex space-x-2 justify-center items-center bg-white px-6 py-4 rounded-xl drop-shadow-lg">
        <LazyLoadImage
          data-cy="modal-information-icon"
          src="/assets/information.svg"
          alt="modal information icon"
        />
        <p className="text-sm">Activity berhasil dihapus!</p>
      </div>
    </div>
  );
}
