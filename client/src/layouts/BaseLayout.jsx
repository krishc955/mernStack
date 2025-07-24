/**
 * Base Layout Component
 * Provides common layout structure for all pages
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ENVIRONMENT } from '../config/environment';

const BaseLayout = ({ 
  children, 
  title = 'Vinora - Premium Fashion Store',
  description = 'Discover premium fashion collections at Vinora. Quality clothing, accessories, and more.',
  className = '',
  showHeader = true,
  showFooter = true 
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/vinora-social-share.png" />
        
        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/vinora-social-share.png" />
        
        {/* Add development indicator */}
        {ENVIRONMENT.isDevelopment && (
          <meta name="env" content="development" />
        )}
      </Helmet>
      
      <div 
        className={`min-h-screen flex flex-col bg-gradient-to-br from-beige-50 to-beige-100 ${className}`}
        data-env={ENVIRONMENT.mode}
      >
        {/* Development indicator */}
        {ENVIRONMENT.isDevelopment && (
          <div className="dev-only performance-indicator">
            DEV MODE
          </div>
        )}
        
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white p-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        {/* Header */}
        {showHeader && (
          <header role="banner" className="flex-shrink-0">
            {/* Header content will be injected by specific layouts */}
          </header>
        )}
        
        {/* Main content */}
        <main 
          id="main-content" 
          role="main" 
          className="flex-grow container-safe"
          tabIndex="-1"
        >
          {children}
        </main>
        
        {/* Footer */}
        {showFooter && (
          <footer role="contentinfo" className="flex-shrink-0">
            {/* Footer content will be injected by specific layouts */}
          </footer>
        )}
      </div>
    </>
  );
};

export default BaseLayout;
