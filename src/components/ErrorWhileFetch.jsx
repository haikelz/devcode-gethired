import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ErrorWhileFetch() {
  return (
    <div className="flex justify-center items-center flex-col text-center">
      <LazyLoadImage
        effect="blur"
        src="/assets/error-while-fetching.svg"
        alt="error while fetching"
        width={400}
      />
      <h1 className="font-bold text-3xl mt-10">Error while fetching data!</h1>
    </div>
  );
}
