import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="max-w-full bg-secondary min-h-screen w-full">
      <header
        data-cy="header-background"
        className="bg-primary flex justify-center p-4 items-center max-w-full w-full shadow-md"
      >
        <div className="max-w-5xl w-full px-1">
          <Link
            to="/"
            data-cy="header-title"
            className="text-2xl text-white uppercase font-bold"
          >
            To Do List App
          </Link>
        </div>
      </header>
      <main className="w-full max-w-full flex justify-center items-center p-4">
        <section className="max-w-5xl w-full">{children}</section>
      </main>
    </div>
  );
}
