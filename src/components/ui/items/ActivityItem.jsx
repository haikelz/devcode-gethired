import { useSetAtom } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import {
  activityIdAtom,
  activityTitleAtom,
  isOpenDeleteModalAtom,
} from "../../../store";

export function ActivityItem({ item }) {
  const { id, title, created_at } = item;

  const setActivityId = useSetAtom(activityIdAtom);
  const setIsOpenDeleteModal = useSetAtom(isOpenDeleteModalAtom);
  const setActivityTitle = useSetAtom(activityTitleAtom);

  function handleClick() {
    setActivityId(id);
    setIsOpenDeleteModal(true);
    setActivityTitle(title);
  }

  return (
    <div className="bg-white p-5 rounded-xl w-full md:w-[235px] h-[234px] drop-shadow-lg">
      <div className="h-full flex justify-between flex-col items-start">
        <Link to={`/detail/${id}`} className="w-full h-full">
          <h4
            data-cy="activity-item-title"
            className="text-black text-lg font-bold"
          >
            {title}
          </h4>
        </Link>
        <div className="flex justify-between w-full items-center">
          <p
            data-cy="activity-item-date"
            className="font-medium text-sm text-gray"
          >
            {new Date(created_at).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button
            data-cy="activity-item-delete-button"
            type="button"
            aria-label="activity item delete button"
            onClick={handleClick}
          >
            <LazyLoadImage src="/assets/trash.svg" alt="trash icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
