function VariantDisplay({ variant, size = "sm" }) {
  if (!variant) return null;

  const sizeClasses = {
    xs: {
      color: "w-3 h-3",
      text: "text-xs",
      badge: "text-xs px-1.5 py-0.5",
      gap: "gap-1"
    },
    sm: {
      color: "w-4 h-4",
      text: "text-xs",
      badge: "text-xs px-2 py-1",
      gap: "gap-2"
    },
    md: {
      color: "w-5 h-5",
      text: "text-sm",
      badge: "text-sm px-3 py-1",
      gap: "gap-2"
    }
  };

  const classes = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className={`flex items-center ${classes.gap}`}>
      {/* Color Display */}
      <div className="flex items-center gap-1">
        <span className={`${classes.text} font-medium text-gray-600`}>Color:</span>
        <div className="flex items-center gap-1">
          <div 
            className={`${classes.color} rounded-full border-2 border-gray-300 shadow-sm`}
            style={{ backgroundColor: variant.colorCode || '#000' }}
          ></div>
          <span className={`${classes.text} text-gray-700 capitalize font-medium`}>
            {variant.color}
          </span>
        </div>
      </div>

      {/* Size Display */}
      <div className="flex items-center gap-1">
        <span className={`${classes.text} font-medium text-gray-600`}>Size:</span>
        <span className={`${classes.badge} font-bold text-gray-900 bg-white border border-gray-300 rounded shadow-sm min-w-[30px] text-center`}>
          {variant.size}
        </span>
      </div>
    </div>
  );
}

export default VariantDisplay;
