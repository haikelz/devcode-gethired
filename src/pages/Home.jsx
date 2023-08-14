import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorWhileFetch from "../components/ErrorWhileFetch";
import Loading from "../components/Loading";
import ActivityItem from "../components/ui/ActivityItem";
import { Button } from "../components/ui/Button";
import { useFetch } from "../hooks";
import { postData } from "../lib/utils/axiosConfig";
import { tw } from "../lib/helpers/tw";

export default function Home() {
  const { data, isLoading, isError } = useFetch(
    ["activity-groups"],
    "/activity-groups?email=siapa@siapa.com"
  );

  async function createNewActivity(config) {
    await postData(`/activity-groups`, config);
  }

  const queryClient = useQueryClient();

  const createNewActivityMutation = useMutation({
    mutationFn: createNewActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "activity-groups" });
    },
  });

  function handleCreate() {
    createNewActivityMutation.mutate({
      title: "New Activity",
      email: "siapa@siapa.com",
      _comment: "asfdasf",
    });
  }

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhileFetch />;

  const activities = data.data;

  console.log(activities);
  return (
    <div className="py-4">
      <div data-cy="activity" className="flex justify-between items-center">
        <span data-cy="activity-title" className="font-bold text-3xl">
          Activity
        </span>
        <Button
          data-cy="activity-add-button"
          className={tw(
            "bg-primary space-x-1",
            "font-semibold flex justify-center items-center"
          )}
          label="tambah"
          onClick={handleCreate}
        >
          <LazyLoadImage src="/assets/plus.svg" alt="tambah" />{" "}
          <span>Tambah</span>
        </Button>
      </div>
      <div className="mt-10 w-full">
        {activities.length ? (
          <div
            className={tw(
              "grid grid-cols-1 grid-rows-1 gap-4",
              "sm:grid-cols-2",
              "md:grid-cols-3",
              "lg:grid-cols-4"
            )}
          >
            {activities.map((item, index) => (
              <ActivityItem key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div>
            <LazyLoadImage
              effect="blur"
              data-cy="activity-empty-state"
              src="/assets/activity-empty-state.svg"
              alt="activity empty state"
            />
          </div>
        )}
      </div>
    </div>
  );
}
