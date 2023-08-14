import { LazyLoadImage } from "react-lazy-load-image-component";
import Layout from "../components/Layout";
import { useFetch } from "../hooks";

export default function NewActivity() {
  const { data, isLoading, isError } = useFetch(
    `activity-groups?email=siapa@siapa.com`
  );

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error!</p>;

  return (
    <Layout>
      <div className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <button type="button" aria-label="">
              <img src="" alt="" />
            </button>
            <h1 data-cy="todo-title" className="font-bold text-4xl">
              New Activity
            </h1>
          </div>
          <button
            data-cy="todo-add-button"
            className="bg-primary text-white py-3 px-5 font-semibold rounded-full"
            type="button"
            aria-label="tambah"
          >
            + Tambah
          </button>
        </div>
        <div className="mt-10">
          {data.length ? (
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4 grid-rows-1">
              {data.map((item, index) => (
                <div
                  data-cy={`activity-item-${index}`}
                  key={item.id}
                  className="bg-white p-5 rounded-xl w-full md:w-[235px] h-[234px] shadow-lg"
                >
                  <p
                    data-cy="activity-item-title"
                    className="text-black text-lg font-bold"
                  >
                    {item.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <p
                      data-cy="activity-item-date"
                      className="font-medium text-sm text-gray"
                    >
                      {new Date(item.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <LazyLoadImage
                      effect="blur"
                      data-cy="todo-item-delete-button"
                      src="/assets/trash.svg"
                      alt="trash icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div aria-label="todo empty state">
              <LazyLoadImage
                data-cy="todo-empty-state"
                src="/assets/todo-empty-state.svg"
                alt="todo empty state"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
