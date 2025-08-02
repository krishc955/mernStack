import React from 'react';
import FacebookVideoPlayer from '../components/social-media/FacebookVideoPlayer';

const VideoTest = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Facebook Video Test</h1>
      <div className="max-w-md">
        <FacebookVideoPlayer 
          videoUrl="https://www.facebook.com/share/v/1VdtY6TReA/"
          title="Test Facebook Video"
          thumbnail={null}
        />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Click play button above. You should see a green badge saying "Testing with provided embed code"
      </p>
    </div>
  );
};

export default VideoTest;
