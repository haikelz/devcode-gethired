import clsx from "clsx";

export function Button({ children, className, label, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={clsx(
        "text-white py-3 px-5 font-semibold rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
