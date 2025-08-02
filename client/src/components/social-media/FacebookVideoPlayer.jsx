import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';

const FacebookVideoPlayer = ({ videoUrl, embedCode, title, thumbnail, autoPlay = false }) => {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [fbVideoId, setFbVideoId] = useState(null);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    // Extract Facebook video ID from URL if available
    const extractVideoId = (url) => {
      if (!url) return null;
      
      const patterns = [
        /facebook\.com\/.*\/videos\/(\d+)/,
        /fb\.watch\/([a-zA-Z0-9]+)/,
        /facebook\.com\/watch\/\?v=(\d+)/,
        /facebook\.com\/share\/v\/([a-zA-Z0-9]+)/,
        /facebook\.com\/share\/video\/([a-zA-Z0-9]+)/,
        /facebook\.com\/.*\/posts\/(\d+)/,
        /facebook\.com\/reel\/(\d+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    if (videoUrl) {
      const videoId = extractVideoId(videoUrl);
      setFbVideoId(videoId);
    }
  }, [videoUrl]);

  const handlePlayVideo = () => {
    setIsEmbedded(true);
    
    // If we have embed code, use it directly without validation
    if (embedCode && embedCode.trim()) {
      setEmbedError(false);
      return;
    }
    
    // For URL-based videos, check if we need fallback
    if (videoUrl) {
      const isShareUrl = videoUrl.includes('/share/v/') || videoUrl.includes('/share/video/');
      setEmbedError(isShareUrl);
    } else {
      setEmbedError(true); // No URL and no embed code
    }
  };

  const handleOpenOriginal = (e) => {
    e.stopPropagation();
    // Only open in new window if not already embedded and we have a URL
    if (!isEmbedded && videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (isEmbedded) {
    // Show embed code if available, or fallback if there's an error
    if (embedError && !embedCode) {
      // Show improved fallback when embed fails and no embed code available
      return (
        <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200 rounded-lg">
          <div className="text-center p-6 max-w-sm">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">f</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Facebook Video</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              This video is restricted and cannot be embedded. You can watch it directly on Facebook.
            </p>
            <div className="space-y-3">
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Watch on Facebook
              </a>
              <br />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEmbedded(false);
                  setEmbedError(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to thumbnail
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Show the video player (either embed code or iframe)
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        {/* Use embed code if available, otherwise construct URL */}
        {embedCode && embedCode.trim() ? (
          <div 
            dangerouslySetInnerHTML={{ __html: embedCode }}
            className="w-full h-full"
            style={{ 
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          />
        ) : videoUrl ? (
          <iframe 
            src={`https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(videoUrl)}&show_text=false&width=267&t=0`}
            width="100%" 
            height="100%" 
            style={{border: 'none', overflow: 'hidden'}} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={title || 'Facebook Video'}
            onError={() => setEmbedError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">No video source available</p>
          </div>
        )}
        
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEmbedded(false);
            setEmbedError(false);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300 z-10"
          title="Close video"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
      {/* Thumbnail */}
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: thumbnail ? `url(${thumbnail})` : 'linear-gradient(45deg, #1877f2, #42a5f5)' 
        }}
        onClick={handlePlayVideo} // Make the whole area clickable for play
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          {/* Play Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayVideo();
            }}
            className="w-16 h-16 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </button>
        </div>

        {/* Facebook Logo */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#1877f2] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">f</span>
          </div>
          <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
            Facebook
          </span>
        </div>

        {/* External Link Button */}
        <button
          onClick={handleOpenOriginal}
          className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-300"
          title="Open on Facebook (new tab)"
        >
          <ExternalLink className="w-4 h-4 text-white" />
        </button>

        {/* Title */}
        {title && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-sm font-medium bg-black bg-opacity-50 px-3 py-2 rounded">
              {title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookVideoPlayer;
