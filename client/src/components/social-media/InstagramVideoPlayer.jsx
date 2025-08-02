import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Instagram } from 'lucide-react';

const InstagramVideoPlayer = ({ videoUrl, title, thumbnail, autoPlay = false }) => {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [instagramPostId, setInstagramPostId] = useState(null);

  useEffect(() => {
    // Extract Instagram post ID from URL
    const extractPostId = (url) => {
      const patterns = [
        /instagram\.com\/p\/([a-zA-Z0-9_-]+)/,
        /instagram\.com\/reel\/([a-zA-Z0-9_-]+)/,
        /instagr\.am\/p\/([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    if (videoUrl) {
      const postId = extractPostId(videoUrl);
      setInstagramPostId(postId);
    }
  }, [videoUrl]);

  const handlePlayVideo = () => {
    setIsEmbedded(true);
  };

  const handleOpenOriginal = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  if (isEmbedded && instagramPostId) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink={videoUrl}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%'
          }}
        >
          <div style={{ padding: '16px' }}>
            <a 
              href={videoUrl}
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              View this post on Instagram
            </a>
          </div>
        </blockquote>
        
        <script 
          async 
          src="//www.instagram.com/embed.js"
          onLoad={() => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-lg overflow-hidden group cursor-pointer">
      {/* Thumbnail */}
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: thumbnail ? `url(${thumbnail})` : undefined
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          {/* Play Button */}
          <button
            onClick={handlePlayVideo}
            className="w-16 h-16 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg"
          >
            <Play className="w-6 h-6 text-gray-800 ml-1" />
          </button>
        </div>

        {/* Instagram Logo */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-lg flex items-center justify-center">
            <Instagram className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
            Instagram
          </span>
        </div>

        {/* External Link Button */}
        <button
          onClick={handleOpenOriginal}
          className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-300"
          title="Open on Instagram"
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

export default InstagramVideoPlayer;
