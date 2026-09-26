import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  description = "Unable to load this information.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-zinc-900 p-3">
        <AlertCircle className="text-zinc-400" size={24} />
      </div>

      <h3 className="text-base font-medium text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-zinc-500">
        {description}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-900"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;