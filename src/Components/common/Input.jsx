function Input({
  label,
  error,
  id,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-zinc-200"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full
          rounded-lg
          border
          border-zinc-700
          bg-zinc-950
          px-4
          py-3
          text-sm
          text-white
          placeholder:text-zinc-600
          outline-none
          transition
          focus:border-zinc-400
          focus:ring-1
          focus:ring-zinc-400
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;