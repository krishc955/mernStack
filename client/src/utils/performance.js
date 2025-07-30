// Performance monitoring utilities
export const performance = {
  // Mark performance points
  mark: (name) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },

  // Measure performance between marks
  measure: (name, startMark, endMark) => {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        return measure ? measure.duration : 0;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return 0;
      }
    }
    return 0;
  },

  // Monitor Core Web Vitals
  getCLS: (callback) => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS }) => {
        getCLS(callback);
      }).catch(() => {
        // Fallback if web-vitals not available
        callback({ value: 0, name: 'CLS' });
      });
    }
  },

  getFID: (callback) => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getFID }) => {
        getFID(callback);
      }).catch(() => {
        callback({ value: 0, name: 'FID' });
      });
    }
  },

  getLCP: (callback) => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getLCP }) => {
        getLCP(callback);
      }).catch(() => {
        callback({ value: 0, name: 'LCP' });
      });
    }
  },

  getFCP: (callback) => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getFCP }) => {
        getFCP(callback);
      }).catch(() => {
        callback({ value: 0, name: 'FCP' });
      });
    }
  },

  getTTFB: (callback) => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getTTFB }) => {
        getTTFB(callback);
      }).catch(() => {
        callback({ value: 0, name: 'TTFB' });
      });
    }
  }
};

// Image optimization utilities
export const imageUtils = {
  // Preload critical images
  preloadImage: (src, as = 'image') => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = as;
      link.href = src;
      document.head.appendChild(link);
    }
  },

  // Preload multiple images
  preloadImages: (srcs) => {
    srcs.forEach(src => imageUtils.preloadImage(src));
  },

  // Get device pixel ratio optimized size
  getOptimalSize: (baseWidth, baseHeight) => {
    if (typeof window !== 'undefined') {
      const dpr = window.devicePixelRatio || 1;
      return {
        width: Math.round(baseWidth * dpr),
        height: Math.round(baseHeight * dpr)
      };
    }
    return { width: baseWidth, height: baseHeight };
  }
};

// Resource hints utilities
export const resourceHints = {
  // DNS prefetch for external domains
  dnsPrefetch: (domain) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    }
  },

  // Preconnect to external domains
  preconnect: (domain, crossorigin = false) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      if (crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  },

  // Prefetch resources
  prefetch: (href) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  }
};

// Bundle analysis in development
export const bundleAnalysis = {
  logBundleSize: () => {
    if (import.meta.env.MODE === 'development') {
      // Log performance entries for debugging
      if (typeof window !== 'undefined' && window.performance) {
        const resources = window.performance.getEntriesByType('resource');
        const totalSize = resources.reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0);
        
        console.log('📦 Total Resources Size:', (totalSize / 1024 / 1024).toFixed(2), 'MB');
        console.log('🎯 JS Resources:', resources.filter(r => r.name.includes('.js')).length);
        console.log('🎨 CSS Resources:', resources.filter(r => r.name.includes('.css')).length);
        console.log('🖼️ Image Resources:', resources.filter(r => r.name.includes('.jpg') || r.name.includes('.png') || r.name.includes('.webp')).length);
      }
    }
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // DNS prefetch for external domains
    resourceHints.dnsPrefetch('//res.cloudinary.com');
    resourceHints.dnsPrefetch('//fonts.googleapis.com');
    resourceHints.dnsPrefetch('//fonts.gstatic.com');
    
    // Preconnect to critical domains
    resourceHints.preconnect('https://res.cloudinary.com', true);
    
    // Monitor Core Web Vitals in production
    if (import.meta.env.MODE === 'production') {
      performance.getLCP((metric) => {
        // Log to analytics service
        console.log('LCP:', metric.value);
      });
      
      performance.getFID((metric) => {
        console.log('FID:', metric.value);
      });
      
      performance.getCLS((metric) => {
        console.log('CLS:', metric.value);
      });
    }
    
    // Bundle analysis in development
    if (import.meta.env.MODE === 'development') {
      setTimeout(bundleAnalysis.logBundleSize, 3000);
    }
  }
};
