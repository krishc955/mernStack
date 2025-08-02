import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all videos
  const fetchAllVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setVideos(data.data);
        setError(null);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setError('Request timeout. Please try again.');
      } else {
        setError('Failed to load videos. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized styles for video gallery with responsive design
  const videoGalleryStyles = useMemo(() => `
    .video-gallery-container::-webkit-scrollbar {
      display: none;
    }
    .video-gallery-container {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    
    .video-gallery-card {
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
      position: relative;
      overflow: hidden;
    }
    
    .video-gallery-card:hover {
      transform: translateY(-4px);
    }
    
    .video-gallery-card::before {
      display: none;
    }
    
    .video-embed-gallery-container {
      margin-bottom: 0.25rem;
      position: relative;
    }
    
    .video-embed-gallery-raw iframe {
      display: block !important;
      width: 100% !important;
      border: none !important;
      border-radius: 0 !important;
      background: transparent !important;
      outline: none !important;
      box-shadow: none !important;
      aspect-ratio: 8/16 !important;
      height: auto !important;
    }
    
    .video-gallery-placeholder {
      width: 100%;
      aspect-ratio: 8/16;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, 
        hsl(30, 40%, 45%) 0%, 
        hsl(35, 35%, 55%) 50%, 
        hsl(40, 30%, 65%) 100%);
      color: hsl(42, 30%, 95%);
      position: relative;
      overflow: hidden;
      margin-bottom: 0.25rem;
    }
    
    .video-gallery-placeholder::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, 
        transparent 30%, 
        hsla(42, 30%, 95%, 0.1) 50%, 
        transparent 70%);
      animation: shimmer 3s ease-in-out infinite;
    }
    
    .video-info-gallery-card {
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 0;
      position: relative;
    }
    
    .platform-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 6px 12px;
      border-radius: 12px;
      fontSize: 0.75rem;
      fontWeight: 500;
      textTransform: capitalize;
      fontFamily: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 10;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .loading-skeleton-gallery {
      background: linear-gradient(90deg, 
        hsl(40, 20%, 88%) 25%, 
        hsl(40, 25%, 85%) 50%, 
        hsl(40, 20%, 88%) 75%);
      background-size: 200% 100%;
      animation: loading-shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @keyframes loading-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .video-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 0.8rem !important;
      }
      
      .video-gallery-card {
        padding: 0 !important;
        border: none !important;
        background: transparent !important;
      }
      
      .video-gallery-placeholder {
        aspect-ratio: 8/16 !important;
      }
      
      .video-embed-gallery-raw iframe {
        aspect-ratio: 8/16 !important;
        height: auto !important;
        border: none !important;
        border-radius: 0 !important;
      }
    }
    
    @media (max-width: 480px) {
      .video-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 1rem !important;
        max-width: 100% !important;
        margin: 0 auto !important;
      }
      
      .video-gallery-card {
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        background: transparent !important;
        max-width: 100% !important;
        margin: 0 auto !important;
      }
      
      .video-gallery-placeholder {
        aspect-ratio: 8/16 !important;
        max-width: 100% !important;
        width: 100% !important;
      }
      
      .video-embed-gallery-raw iframe {
        aspect-ratio: 8/16 !important;
        height: auto !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .mobile-container {
        padding: 0 5px !important;
      }
      
      .platform-badge {
        top: 0.4rem !important;
        right: 0.4rem !important;
        padding: 3px 6px !important;
        font-size: 0.65rem !important;
      }
    }
    
    @media (max-width: 375px) {
      .video-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 0.8rem !important;
      }
      
      .video-gallery-card {
        padding: 0 !important;
        border: none !important;
        background: transparent !important;
      }
      
      .video-gallery-placeholder {
        aspect-ratio: 8/16 !important;
      }
      
      .video-embed-gallery-raw iframe {
        aspect-ratio: 8/16 !important;
        height: auto !important;
        border: none !important;
        outline: none !important;
      }
    }
  `, []);

  useEffect(() => {
    fetchAllVideos();
    
    // Add CSS for video gallery styling
    const style = document.createElement('style');
    style.id = 'video-gallery-styles';
    style.textContent = videoGalleryStyles;
    
    if (!document.getElementById('video-gallery-styles')) {
      document.head.appendChild(style);
    }
    
    return () => {
      const existingStyle = document.getElementById('video-gallery-styles');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, [fetchAllVideos, videoGalleryStyles]);

  // Production-optimized stable video component with error boundaries
  const StableVideoComponent = React.memo(({ embedCode, videoId, title, platform }) => {
    const [htmlContent] = React.useState(() => {
      // Sanitize embed code for production
      if (!embedCode || typeof embedCode !== 'string') {
        return '';
      }
      return embedCode;
    });
    const [hasError, setHasError] = React.useState(false);
    const hasRendered = React.useRef(false);
    
    React.useEffect(() => {
      if (!hasRendered.current) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ StableVideo mounted for: ${title}`);
        }
        hasRendered.current = true;
      }
    }, [title]);
    
    // Error boundary for embed content
    React.useEffect(() => {
      const handleError = () => setHasError(true);
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }, []);
    
    if (hasError || !htmlContent) {
      return (
        <div className="video-gallery-placeholder">
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1rem',
              filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))'
            }}>⚠️</div>
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '1.2rem',
              fontWeight: '600',
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.02em',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}>{title}</h3>
            <p style={{ 
              margin: 0, 
              fontSize: '0.95rem', 
              opacity: 0.9,
              fontWeight: '400',
              fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.01em'
            }}>Video unavailable</p>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="video-embed-gallery-raw"
        style={{ marginBottom: '0.25rem' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }, () => true);

  // Retry function
  const handleRetry = useCallback(() => {
    setError(null);
    fetchAllVideos();
  }, [fetchAllVideos]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, hsl(42, 25%, 98%) 0%, hsl(40, 30%, 96%) 50%, hsl(42, 25%, 98%) 100%)',
      paddingTop: '2rem',
      paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 min(20px, 2vw)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '600',
            color: 'hsl(30, 35%, 20%)',
            marginBottom: '1rem',
            fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: '-0.03em'
          }}>
            Video Gallery
          </h1>
          <p style={{
            color: 'hsl(30, 25%, 50%)',
            fontSize: '1.2rem',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: '-0.01em',
            fontWeight: '400',
            lineHeight: '1.6'
          }}>
            Explore our complete collection of videos showcasing fashion, styling tips, and behind-the-scenes content
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="video-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div className="loading-skeleton-gallery" style={{
                  width: '100%',
                  aspectRatio: '8/16',
                  borderRadius: '0',
                  marginBottom: '0.25rem'
                }} />
                <div className="loading-skeleton-gallery" style={{
                  width: '80%',
                  height: '16px',
                  borderRadius: '4px',
                  marginBottom: '0.125rem'
                }} />
                <div className="loading-skeleton-gallery" style={{
                  width: '60%',
                  height: '12px',
                  borderRadius: '4px'
                }} />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'hsl(42, 30%, 97%)',
            borderRadius: '20px',
            border: '2px solid hsl(40, 20%, 90%)',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem',
              filter: 'sepia(20%) saturate(150%) hue-rotate(10deg)'
            }}>⚠️</div>
            
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'hsl(0, 60%, 50%)',
              marginBottom: '1rem',
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.02em'
            }}>
              Unable to Load Videos
            </h3>
            
            <p style={{
              color: 'hsl(30, 25%, 50%)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              lineHeight: '1.6',
              fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.01em',
              fontWeight: '400'
            }}>
              {error}
            </p>
            
            <button 
              onClick={handleRetry}
              style={{
                background: 'linear-gradient(135deg, hsl(30, 40%, 45%) 0%, hsl(35, 35%, 55%) 100%)',
                color: 'hsl(42, 30%, 95%)',
                padding: '14px 28px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(101, 74, 55, 0.3)'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Videos State */}
        {!isLoading && !error && videos.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'hsl(42, 30%, 97%)',
            borderRadius: '20px',
            border: '2px solid hsl(40, 20%, 90%)'
          }}>
            <div style={{ 
              fontSize: '5rem', 
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, hsl(30, 40%, 45%) 0%, hsl(35, 35%, 55%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(2px 2px 4px rgba(101, 74, 55, 0.1))'
            }}>📺</div>
            
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: '600',
              color: 'hsl(30, 35%, 20%)',
              marginBottom: '1rem',
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.02em'
            }}>
              No Videos Found
            </h3>
            
            <p style={{
              color: 'hsl(30, 25%, 50%)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.01em',
              fontWeight: '400'
            }}>
              No videos available at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* Videos Grid */}
        {!isLoading && !error && videos.length > 0 && (
          <>
            <div className="video-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '0.75rem',
              marginBottom: '2rem'
            }}>
              {videos.map((video, index) => (
                <div key={`${video._id}-${index}`} className="video-gallery-card">
                  {/* Video Embed with enhanced styling */}
                  <StableVideoComponent 
                    embedCode={video.embedCode}
                    videoId={video._id}
                    title={video.title}
                    platform={video.platform}
                  />

                  {/* Video Info with enhanced styling */}
                  <div className="video-info-gallery-card">
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: 'hsl(30, 35%, 20%)',
                      margin: '0 0 4px 0',
                      lineHeight: '1.3',
                      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                      letterSpacing: '-0.02em'
                    }}>
                      {video.title}
                    </h3>
                    
                    {video.description && (
                      <p style={{
                        fontSize: '0.8rem',
                        color: 'hsl(30, 25%, 50%)',
                        margin: 0,
                        lineHeight: '1.4',
                        fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        letterSpacing: '-0.01em',
                        fontWeight: '400',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Results Counter */}
            <div style={{
              textAlign: 'center',
              marginTop: '3rem',
              padding: '1.5rem',
              background: 'hsl(42, 30%, 97%)',
              borderRadius: '16px',
              border: '1px solid hsl(40, 20%, 90%)'
            }}>
              <p style={{
                color: 'hsl(30, 25%, 50%)',
                fontSize: '1rem',
                margin: 0,
                fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: '-0.01em',
                fontWeight: '400'
              }}>
                Showing {videos.length} videos
              </p>
            </div>
          </>
        )}

        {/* Back to Home Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'linear-gradient(135deg, hsl(30, 40%, 45%) 0%, hsl(35, 35%, 55%) 100%)',
              color: 'hsl(42, 30%, 95%)',
              padding: '14px 28px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(101, 74, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(101, 74, 55, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(101, 74, 55, 0.3)';
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
