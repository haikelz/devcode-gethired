import { tw } from "../../lib/helpers";

export function Button({ children, className, label, ...props }) {
  return (
    <button
      {...props}
      type="button"
      aria-label={label}
      className={tw(
        "py-3 px-5 font-semibold rounded-full text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
