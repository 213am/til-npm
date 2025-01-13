import clsx from "clsx";

function Alert({ message, type }) {
  return (
    <div
      className={clsx(
        "p-4 rounded m-4",
        type === "success" && "bg-green-200 text-green-700",
        type === "error" && "bg-yellow-200 text-yellow-700",
        type === "warning" && "bg-red-200 text-red-700",
      )}
    >
      {message}
    </div>
  );
}

export default Alert;
