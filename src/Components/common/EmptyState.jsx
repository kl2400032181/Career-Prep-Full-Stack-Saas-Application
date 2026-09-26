import { Inbox } from "lucide-react";

function EmptyState({
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-zinc-900 p-3">
        <Inbox className="text-zinc-400" size={24} />
      </div>

      <h3 className="text-base font-medium text-white">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;