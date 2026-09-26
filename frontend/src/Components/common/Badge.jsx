function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: "bg-zinc-800 text-zinc-300",
    success: "bg-zinc-800 text-zinc-200",
    warning: "bg-zinc-800 text-zinc-300",
    danger: "bg-zinc-800 text-zinc-300",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;