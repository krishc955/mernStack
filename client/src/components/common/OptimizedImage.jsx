import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 'auto', 
  height = 'auto',
  quality = 80,
  format = 'webp',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Cloudinary optimization
  const getOptimizedUrl = (url) => {
    if (!url) return '';
    
    // Check if it's a Cloudinary URL
    if (url.includes('cloudinary.com') || url.includes('res.cloudinary.com')) {
      // Extract the public ID and version from Cloudinary URL
      const parts = url.split('/');
      const uploadIndex = parts.findIndex(part => part === 'upload');
      
      if (uploadIndex !== -1) {
        const beforeUpload = parts.slice(0, uploadIndex + 1).join('/');
        const afterUpload = parts.slice(uploadIndex + 1).join('/');
        
        // Remove existing transformations if any
        const publicIdParts = afterUpload.split('/');
        const publicId = publicIdParts[publicIdParts.length - 1];
        
        // Build optimized URL with transformations
        const transformations = [
          `f_${format}`, // Format (webp for better compression)
          `q_${quality}`, // Quality
          'c_fill', // Crop mode
          width !== 'auto' ? `w_${width}` : '',
          height !== 'auto' ? `h_${height}` : '',
          'dpr_auto', // Device pixel ratio
          'fl_progressive', // Progressive loading
          'fl_immutable_cache' // Better caching
        ].filter(Boolean).join(',');
        
        return `${beforeUpload}/${transformations}/${publicId}`;
      }
    }
    
    return url;
  };

  // Load image when in view
  useEffect(() => {
    if (isInView && src && !imageSrc) {
      const optimizedSrc = getOptimizedUrl(src);
      
      const img = new Image();
      img.onload = () => {
        setImageSrc(optimizedSrc);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoaded(true);
      };
      img.src = optimizedSrc;
    }
  }, [isInView, src, imageSrc, format, quality, width, height]);

  // Placeholder while loading
  const placeholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f5f5f5"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#ccc" font-family="Arial, sans-serif" font-size="14">
        ${isInView ? 'Loading...' : 'Image'}
      </text>
    </svg>
  `)}`;

  const errorPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f8f8"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
        Image unavailable
      </text>
    </svg>
  `)}`;

  return (
    <img
      ref={imgRef}
      src={hasError ? errorPlaceholder : (imageSrc || placeholder)}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-70'
      } ${className}`}
      loading={loading}
      sizes={sizes}
      style={{
        backgroundColor: '#f5f5f5',
        minHeight: '100px'
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
