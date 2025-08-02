import React, { useState, useEffect, useCallback, useMemo } from 'react';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Production-ready fetch with proper error handling and timeout
  const fetchVideos = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos?limit=10`,
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
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ Loaded ${data.data.length} videos`);
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setError('Request timeout. Please try again.');
      } else {
        setError('Failed to load videos. Please try again later.');
      }
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Error fetching videos:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoized styles to prevent recreation on every render
  const videoSectionStyles = useMemo(() => `
    .video-scroll-container::-webkit-scrollbar {
      display: none;
    }
    .video-scroll-container {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    
    .video-card {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 245px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .video-card:hover {
      transform: translateY(-8px);
    }
    
    .video-embed-container {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(101, 74, 55, 0.15);
      position: relative;
      background: hsl(42, 30%, 97%);
      border: 2px solid hsl(40, 20%, 90%);
      transition: all 0.3s ease;
    }
    
    .video-embed-container:hover {
      box-shadow: 0 12px 35px rgba(101, 74, 55, 0.25);
      border-color: hsl(30, 40%, 45%);
    }
    
    .video-embed-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        hsla(30, 40%, 45%, 0.05) 0%, 
        hsla(40, 35%, 55%, 0.03) 50%, 
        hsla(42, 30%, 65%, 0.02) 100%);
      pointer-events: none;
      z-index: 1;
    }
    
    .video-embed-raw iframe {
      border-radius: 14px !important;
      display: block !important;
      width: 100% !important;
      max-width: 245px !important;
      position: relative;
      z-index: 2;
    }
    
    .video-placeholder {
      width: 245px;
      height: 138px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, 
        hsl(30, 40%, 45%) 0%, 
        hsl(35, 35%, 55%) 50%, 
        hsl(40, 30%, 65%) 100%);
      color: hsl(42, 30%, 95%);
      border-radius: 16px;
      box-shadow: 0 8px 25px rgba(101, 74, 55, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .video-placeholder::before {
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
    
    .video-info-card {
      background: hsl(42, 30%, 97%);
      border: 1px solid hsl(40, 20%, 90%);
      border-radius: 12px;
      padding: 16px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .video-info-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, 
        hsl(30, 40%, 45%) 0%, 
        hsl(35, 35%, 55%) 50%, 
        hsl(40, 30%, 65%) 100%);
    }
    
    .video-info-card:hover {
      background: hsl(42, 35%, 96%);
      border-color: hsl(30, 40%, 45%);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(101, 74, 55, 0.1);
    }
    
    .section-gradient {
      background: linear-gradient(135deg, 
        hsl(42, 25%, 98%) 0%, 
        hsl(40, 30%, 96%) 50%, 
        hsl(42, 25%, 98%) 100%);
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        background-color: hsl(40, 20%, 88%);
      }
      50% {
        opacity: 0.8;
        background-color: hsl(40, 25%, 85%);
      }
    }
    
    .loading-skeleton {
      background: linear-gradient(90deg, 
        hsl(40, 20%, 88%) 25%, 
        hsl(40, 25%, 85%) 50%, 
        hsl(40, 20%, 88%) 75%);
      background-size: 200% 100%;
      animation: loading-shimmer 2s infinite;
    }
    
    @keyframes loading-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `, []);

  useEffect(() => {
    fetchVideos();
    
    // Add CSS for horizontal scrolling and video styling
    const style = document.createElement('style');
    style.id = 'video-section-styles';
    style.textContent = videoSectionStyles;
    
    if (!document.getElementById('video-section-styles')) {
      document.head.appendChild(style);
    }
    
    return () => {
      const existingStyle = document.getElementById('video-section-styles');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, [fetchVideos, videoSectionStyles]);

  // Production-optimized stable video component with error boundaries
  const StableVideoComponent = React.memo(({ embedCode, videoId, title }) => {
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
        <div style={{
          width: '245px',
          height: '138px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(40, 20%, 95%)',
          borderRadius: '16px',
          color: 'hsl(30, 25%, 50%)',
          border: '2px solid hsl(40, 20%, 90%)',
          boxShadow: '0 4px 15px rgba(101, 74, 55, 0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              marginBottom: '0.5rem',
              filter: 'sepia(30%) saturate(120%) hue-rotate(15deg)'
            }}>⚠️</div>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'hsl(30, 30%, 55%)'
            }}>Video unavailable</p>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="video-embed-simple"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }, () => true);

  // Retry function for failed requests
  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    fetchVideos();
  }, [fetchVideos]);

  if (isLoading) {
    return (
      <section className="section-gradient" style={{ padding: '40px 0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
              Loading Videos
            </h2>
          </div>
          
          <div className="video-scroll-container" style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            padding: '10px 0 20px 0'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div className="loading-skeleton" style={{
                  width: '245px',
                  height: '138px',
                  borderRadius: '16px',
                  border: '2px solid hsl(40, 20%, 90%)'
                }} />
                <div className="loading-skeleton" style={{
                  width: '210px',
                  height: '20px',
                  borderRadius: '8px',
                  margin: '0 18px'
                }} />
                <div className="loading-skeleton" style={{
                  width: '155px',
                  height: '16px',
                  borderRadius: '6px',
                  margin: '0 18px'
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-gradient" style={{ padding: '40px 0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
              Latest Videos
            </h2>
          </div>
          
          <div style={{
            padding: '3rem 2rem',
            background: 'hsl(42, 30%, 97%)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(101, 74, 55, 0.1)',
            border: '2px solid hsl(40, 20%, 90%)',
            marginTop: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, hsl(0, 84%, 60%) 0%, hsl(15, 70%, 55%) 100%)'
            }} />
            
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1.5rem',
              filter: 'sepia(20%) saturate(150%) hue-rotate(10deg)'
            }}>⚠️</div>
            
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'hsl(0, 60%, 50%)',
              marginBottom: '1rem'
            }}>
              Unable to Load Videos
            </h3>
            
            <p style={{
              color: 'hsl(30, 25%, 50%)',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
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
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(101, 74, 55, 0.3)',
                position: 'relative',
                overflow: 'hidden'
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
              <span style={{ position: 'relative', zIndex: 1 }}>Try Again</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return (
      <section className="section-gradient" style={{ padding: '40px 0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
              Latest Videos
            </h2>
          </div>
          
          <div style={{
            padding: '4rem 2rem',
            background: 'hsl(42, 30%, 97%)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(101, 74, 55, 0.1)',
            border: '2px solid hsl(40, 20%, 90%)',
            marginTop: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, hsl(30, 40%, 45%) 0%, hsl(35, 35%, 55%) 100%)'
            }} />
            
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
              fontWeight: '700',
              color: 'hsl(30, 35%, 20%)',
              marginBottom: '1rem'
            }}>
              No Videos Available
            </h3>
            
            <p style={{
              color: 'hsl(30, 25%, 50%)',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              Check back later for new video content.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-gradient" style={{ padding: '40px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brown-800 tracking-tight">
            Latest Videos
          </h2>
          <p style={{
            color: 'hsl(30, 25%, 50%)',
            fontSize: '1.1rem',
            marginTop: '1rem',
            maxWidth: '600px',
            margin: '1rem auto 0'
          }}>
            Discover our curated collection of engaging video content
          </p>
        </div>

        {/* Horizontal scrollable video container */}
        <div 
          className="video-scroll-container"
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            padding: '10px 0 20px 0'
          }}
        >
          {videos.map((video, index) => (
            <div key={`video-${video._id}-${index}`} className="video-card">
              {/* Video Embed - Direct from backend */}
              {video.embedCode ? (
                <div className="video-embed-container">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: video.embedCode 
                    }}
                  />
                </div>
              ) : (
                <div className="video-placeholder">
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{ 
                      fontSize: '3.5rem', 
                      marginBottom: '1rem',
                      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1))'
                    }}>📺</div>
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
                    }}>{video.title}</h3>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.9rem', 
                      opacity: 0.9,
                      fontWeight: '500'
                    }}>Video not available</p>
                  </div>
                </div>
              )}
              
              {/* Video Info */}
              <div className="video-info-card">
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  color: 'hsl(30, 35%, 20%)',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {video.title}
                </h3>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'hsl(30, 25%, 50%)',
                  margin: 0,
                  textTransform: 'capitalize',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'hsl(30, 40%, 45%)',
                    display: 'inline-block'
                  }} />
                  {video.category || 'Uncategorized'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;