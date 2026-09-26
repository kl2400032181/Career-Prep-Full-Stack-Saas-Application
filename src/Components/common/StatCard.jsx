import Card from "./Card";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-zinc-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
            <Icon size={20} className="text-zinc-300" />
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatCard;