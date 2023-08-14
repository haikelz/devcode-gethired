import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { deleteData } from "../../lib/utils/axiosConfig";

export default function ActivityItem({ item, index }) {
  const { id, title, created_at } = item;

  async function deleteActivity(id) {
    await deleteData(`/activity-groups/${id}`);
  }

  const queryClient = useQueryClient();

  const deleteActivityMutation = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: id });
    },
  });

  function handleDelete(id) {
    deleteActivityMutation.mutate(id);
  }

  return (
    <div
      data-cy={`activity-item-${index}`}
      className="bg-white p-5 rounded-xl w-full md:w-[235px] h-[234px] shadow-lg"
    >
      <div className="h-full flex justify-between flex-col items-start">
        <Link to={`/details/${id}`}>
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
            type="button"
            aria-label="activity item delete button"
            onClick={() => handleDelete(id)}
          >
            <LazyLoadImage
              data-cy="activity-item-delete-button"
              src="/assets/trash.svg"
              alt="trash icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
