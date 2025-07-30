import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// Memoized selectors to prevent unnecessary re-renders
export const useOptimizedSelectors = () => {
  const productList = useSelector((state) => state.shopProducts.productList);
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.shopProducts.isLoading);

  // Memoize expensive computations
  const memoizedProductList = useMemo(() => {
    return productList?.slice(0, 20) || []; // Limit initial products
  }, [productList]);

  const memoizedCartItemsCount = useMemo(() => {
    return cartItems?.items?.length || 0;
  }, [cartItems?.items?.length]);

  return {
    productList: memoizedProductList,
    cartItemsCount: memoizedCartItemsCount,
    user,
    isLoading,
    fullProductList: productList
  };
};

// Virtualized product list hook for large datasets
export const useVirtualizedProducts = (products, itemHeight = 400) => {
  return useMemo(() => {
    if (!products || products.length <= 20) {
      return { visibleProducts: products, hasMore: false };
    }
    
    // Return first batch for virtual scrolling
    return {
      visibleProducts: products.slice(0, 20),
      hasMore: products.length > 20,
      totalItems: products.length
    };
  }, [products, itemHeight]);
};

// Debounced search hook
export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
