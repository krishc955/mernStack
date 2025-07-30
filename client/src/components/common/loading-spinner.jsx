import { memo } from 'react';

const LoadingSpinner = memo(({ size = 'medium', color = 'blue', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    brown: 'border-brown-600',
    gray: 'border-gray-600',
    green: 'border-green-600'
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
