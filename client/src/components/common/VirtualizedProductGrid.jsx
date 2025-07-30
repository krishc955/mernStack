import { memo, useState, useEffect, useCallback } from 'react';

// Virtual scrolling component for large product lists
const VirtualizedProductGrid = memo(({ 
  products = [], 
  renderItem, 
  itemHeight = 400, 
  containerHeight = 600,
  className = "",
  itemsPerRow = 4
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState(null);

  // Calculate visible items based on scroll position
  const getVisibleItems = useCallback(() => {
    if (!products.length) return { startIndex: 0, endIndex: 0, visibleItems: [] };

    const rowHeight = itemHeight;
    const totalRows = Math.ceil(products.length / itemsPerRow);
    const visibleRowCount = Math.ceil(containerHeight / rowHeight) + 2; // Buffer rows
    
    const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
    const endRow = Math.min(totalRows - 1, startRow + visibleRowCount);
    
    const startIndex = startRow * itemsPerRow;
    const endIndex = Math.min(products.length - 1, (endRow + 1) * itemsPerRow - 1);
    
    const visibleItems = products.slice(startIndex, endIndex + 1);
    
    return { startIndex, endIndex, visibleItems, startRow };
  }, [products, scrollTop, containerHeight, itemHeight, itemsPerRow]);

  const { startIndex, visibleItems, startRow } = getVisibleItems();

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const totalHeight = Math.ceil(products.length / itemsPerRow) * itemHeight;
  const offsetY = startRow * itemHeight;

  return (
    <div 
      ref={setContainerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${itemsPerRow} gap-4`}>
            {visibleItems.map((item, index) => 
              renderItem(item, startIndex + index)
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

VirtualizedProductGrid.displayName = 'VirtualizedProductGrid';

export default VirtualizedProductGrid;
