import React from 'react';

const TestAbout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f2' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 tracking-tight">
            About Vinora - Test Page
          </h1>
          <p className="text-lg text-amber-700/80 font-medium max-w-2xl mx-auto leading-relaxed">
            This is a test page to verify that our imports are working correctly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestAbout;
