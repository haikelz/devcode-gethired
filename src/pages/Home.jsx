import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ErrorWhileFetch from "../components/ErrorWhileFetch";
import Loading from "../components/Loading";
import {
  ActivityItem,
  Button,
  ConfirmDeleteModal,
  InformationModal,
} from "../components/ui";
import { useFetch } from "../hooks";
import { tw } from "../lib/helpers";
import { deleteData, postData } from "../lib/utils/axiosConfig";
import {
  activityIdAtom,
  activityTitleAtom,
  isDeleteAtom,
  isOpenDeleteModalAtom,
  isOpenInformationModalAtom,
} from "../store";

export default function Home() {
  const [isDelete, setIsDelete] = useAtom(isDeleteAtom);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useAtom(
    isOpenDeleteModalAtom
  );

  const activityId = useAtomValue(activityIdAtom);
  const activityTitle = useAtomValue(activityTitleAtom);
  const [isOpenInformationModal, setIsOpenInformationModal] = useAtom(
    isOpenInformationModalAtom
  );

  const { data, isLoading, isError } = useFetch(
    ["activity-groups"],
    "/activity-groups?email=halo@haikel.app"
  );

  const queryClient = useQueryClient();

  // create new activity
  async function createNewActivity(config) {
    await postData(`/activity-groups`, config);
  }

  const createNewActivityMutation = useMutation({
    mutationFn: createNewActivity,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // create activity
  function handleCreate() {
    createNewActivityMutation.mutate({
      title: "New Activity",
      email: "halo@haikel.app",
    });
  }

  // delete activity
  async function deleteActivity() {
    await deleteData(`/activity-groups/${activityId}`);
  }

  const deleteActivityMutation = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activityId });
    },
  });

  function handleDelete() {
    deleteActivityMutation.mutate(activityId);

    setIsOpenDeleteModal(false);
    setIsOpenInformationModal(true);
  }

  if (isLoading) return <Loading />;
  if (isError) return <ErrorWhileFetch />;

  const activities = data.data;

  return (
    <>
      <div className="py-4">
        <div className="flex justify-between items-center">
          <h2 data-cy="activity-title" className="font-bold text-3xl">
            Activity
          </h2>
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
              {activities.map((item) => (
                <ActivityItem
                  data-cy="activity-item"
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          ) : (
            <div
              data-cy="activity-empty-state"
              onClick={handleCreate}
              className="cursor-pointer"
            >
              <LazyLoadImage
                effect="blur"
                src="/assets/activity-empty-state.svg"
                alt="activity empty state"
              />
            </div>
          )}
        </div>
      </div>
      {isOpenDeleteModal ? (
        <ConfirmDeleteModal title={activityTitle} deleteFunc={handleDelete} />
      ) : null}
      {isOpenInformationModal ? <InformationModal /> : null}
    </>
  );
}
