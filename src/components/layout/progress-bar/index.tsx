const ProgressBar: React.FC<{ colorClassName?: string }> = ({
  colorClassName,
}) => {
  return (
    <div className="relative my-3 ml-3 h-2">
      {/* Left curved cap */}
      <div
        className={`absolute top-1/2 left-0 z-10 size-4 -translate-y-1/2 rotate-45 rounded-sm bg-orange-400 ${colorClassName}`}
      />

      {/* Vertical line */}
      <div
        className={`absolute -top-[15px] left-[6px] h-[40px] w-1 bg-orange-300 ${colorClassName}`}
      />

      {/* Horizontal line */}
      <div
        className={`absolute top-1/2 -left-2 h-1 w-[20px] -translate-y-1/2 bg-orange-300 ${colorClassName}`}
      />
      <div
        className={`absolute top-1/2 left-3 h-1 w-[200px] -translate-y-1/2 bg-orange-300 ${colorClassName}`}
      />
    </div>
  );
};

export default ProgressBar;
