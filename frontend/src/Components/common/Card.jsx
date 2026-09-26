function Card({
  children,
  className = "",
  padding = true,
}) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900/50
        ${padding ? "p-5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;