import React from 'react';
import SocialMediaGallery from '../../components/social-media/SocialMediaGallery';

const SocialMediaPage = () => {
  // Sample video data - replace with your actual Facebook and Instagram video URLs
  const sampleVideos = [
    {
      id: 'fb_video_1',
      platform: 'facebook',
      url: 'https://www.facebook.com/your-page/videos/123456789',
      title: 'New Summer Collection 2024',
      description: 'Check out our latest summer fashion trends featuring lightweight fabrics and vibrant colors.',
      thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/v1/fashion/summer-collection-thumb.jpg',
      date: '2024-07-15',
      views: '2.3K'
    },
    {
      id: 'ig_video_1',
      platform: 'instagram',
      url: 'https://www.instagram.com/p/ABC123DEF456/',
      title: 'Behind the Scenes: Fashion Shoot',
      description: 'Go behind the scenes of our latest fashion photoshoot.',
      thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/v1/fashion/bts-thumb.jpg',
      date: '2024-07-20',
      views: '1.8K'
    },
    {
      id: 'fb_video_2',
      platform: 'facebook',
      url: 'https://www.facebook.com/your-page/videos/987654321',
      title: 'Style Tips: How to Mix and Match',
      description: 'Learn professional styling tips from our fashion experts.',
      thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/v1/fashion/style-tips-thumb.jpg',
      date: '2024-07-25',
      views: '3.1K'
    },
    {
      id: 'ig_video_2',
      platform: 'instagram',
      url: 'https://www.instagram.com/reel/XYZ789ABC123/',
      title: 'Quick Fashion Hacks',
      description: 'Quick and easy fashion hacks every woman should know.',
      thumbnail: 'https://res.cloudinary.com/your-cloud/image/upload/v1/fashion/fashion-hacks-thumb.jpg',
      date: '2024-08-01',
      views: '4.2K'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our latest fashion content, styling tips, and behind-the-scenes moments 
            from our Facebook and Instagram channels.
          </p>
        </div>

        {/* Social Media Gallery */}
        <SocialMediaGallery 
          videos={sampleVideos}
          title="Latest Fashion Videos"
          subtitle="Stay updated with our newest fashion content and styling inspiration"
        />

        {/* Additional Content Sections */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Strategy */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What You'll Find
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Latest fashion collections and new arrivals
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Styling tips and fashion advice from experts
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Behind-the-scenes content from photoshoots
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Customer styling sessions and transformations
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Seasonal fashion trends and color palettes
              </li>
            </ul>
          </div>

          {/* Engagement Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Community Engagement
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Videos</span>
                <span className="font-semibold text-gray-900">{sampleVideos.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Facebook Videos</span>
                <span className="font-semibold text-blue-600">
                  {sampleVideos.filter(v => v.platform === 'facebook').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Instagram Videos</span>
                <span className="font-semibold text-pink-600">
                  {sampleVideos.filter(v => v.platform === 'instagram').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Views</span>
                <span className="font-semibold text-gray-900">
                  {sampleVideos.reduce((total, video) => {
                    const views = parseFloat(video.views.replace('K', '')) * 1000;
                    return total + views;
                  }, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPage;
