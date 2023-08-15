import { tw } from "../../lib/helpers";

export function Button({ children, className, label, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={tw(
        "py-3 px-10 font-semibold rounded-full text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
