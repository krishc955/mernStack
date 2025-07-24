/**
 * Page Layout Component
 * Standard layout for content pages with header and footer
 */

import React from 'react';
import BaseLayout from './BaseLayout';

const PageLayout = ({ 
  children, 
  title,
  description,
  className = '',
  containerClassName = 'container mx-auto px-4 py-8',
  ...props 
}) => {
  return (
    <BaseLayout 
      title={title}
      description={description}
      className={className}
      {...props}
    >
      <div className={containerClassName}>
        {children}
      </div>
    </BaseLayout>
  );
};

export default PageLayout;
