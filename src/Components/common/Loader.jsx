import { Loader2 } from "lucide-react";

function Loader({
  size = 24,
  text = "Loading...",
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <Loader2
        size={size}
        className="animate-spin text-zinc-400"
      />

      {text && (
        <span className="text-sm text-zinc-400">
          {text}
        </span>
      )}
    </div>
  );
}

export default Loader;