import { AnimatePresence, m } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence key={location.pathname}>
      <div className="max-w-full bg-[#F4F4F4] min-h-screen w-full">
        <header
          data-cy="header-background"
          className="bg-[#16ABF8] flex justify-center p-4 items-center max-w-full w-full shadow-md"
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
        <m.main
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="w-full max-w-full flex justify-center items-center p-4"
        >
          <section className="max-w-5xl w-full">{children}</section>
        </m.main>
      </div>
    </AnimatePresence>
  );
}
