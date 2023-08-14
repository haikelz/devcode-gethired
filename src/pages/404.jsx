import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <LazyLoadImage
        src="/assets/not-found.svg"
        width={400}
        h={400}
        alt="not found"
      />
      <h1 className="mt-4 font-bold text-3xl">404 Not Found!</h1>
    </div>
  );
}
