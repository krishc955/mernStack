import React, { useState } from 'react';
import FacebookVideoPlayer from './FacebookVideoPlayer';
import InstagramVideoPlayer from './InstagramVideoPlayer';
import { Grid, List, Filter } from 'lucide-react';

const SocialMediaGallery = ({ 
  videos = [], 
  title = "Follow Our Fashion Journey",
  subtitle = "Latest videos from our social media"
}) => {
  const [filter, setFilter] = useState('all'); // all, facebook, instagram
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const filteredVideos = videos.filter(video => {
    if (filter === 'all') return true;
    return video.platform === filter;
  });

  const getPlatformIcon = (platform) => {
    return platform === 'facebook' ? 'f' : '📷';
  };

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({videos.length})
            </button>
            <button
              onClick={() => setFilter('facebook')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === 'facebook' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Facebook ({videos.filter(v => v.platform === 'facebook').length})
            </button>
            <button
              onClick={() => setFilter('instagram')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === 'instagram' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Instagram ({videos.filter(v => v.platform === 'instagram').length})
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'grid' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Videos Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
      }>
        {filteredVideos.map((video, index) => (
          <div 
            key={video.id || index} 
            className={`${viewMode === 'list' ? 'flex gap-6 items-center' : ''}`}
          >
            <div className={viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}>
              {video.platform === 'facebook' ? (
                <FacebookVideoPlayer 
                  videoUrl={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              ) : (
                <InstagramVideoPlayer 
                  videoUrl={video.url}
                  title={video.title}
                  thumbnail={video.thumbnail}
                />
              )}
            </div>
            
            {viewMode === 'list' && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {video.description}
                </p>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <span className="flex items-center">
                    <span className="mr-1">{getPlatformIcon(video.platform)}</span>
                    {video.platform}
                  </span>
                  <span>•</span>
                  <span>{video.date}</span>
                  {video.views && (
                    <>
                      <span>•</span>
                      <span>{video.views} views</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No videos found for the selected filter.</p>
        </div>
      )}

      {/* Follow Us CTA */}
      <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Follow us for more updates!
        </h3>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://facebook.com/your-page" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-[#1877f2] text-white rounded-lg hover:bg-[#166fe5] transition-colors"
          >
            <span className="mr-2">f</span>
            Facebook
          </a>
          <a 
            href="https://instagram.com/your-account" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <span className="mr-2">📷</span>
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGallery;
