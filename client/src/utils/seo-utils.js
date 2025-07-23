import { useState, useEffect } from 'react';

// Sitemap generator utility
export const generateSitemap = (products = []) => {
  const baseUrl = 'https://www.vinora.royalappleshimla.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/shop/home', changefreq: 'daily', priority: '1.0' },
    { url: '/shop/listing', changefreq: 'daily', priority: '0.9' },
    { url: '/shop/search', changefreq: 'weekly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/faq', changefreq: 'monthly', priority: '0.6' },
    { url: '/auth/login', changefreq: 'monthly', priority: '0.5' },
    { url: '/auth/register', changefreq: 'monthly', priority: '0.5' },
  ];

  // Product pages
  const productPages = products.map(product => ({
    url: `/shop/product/${product._id}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: currentDate
  }));

  // Category pages
  const categories = ['men', 'women', 'kids', 'accessories', 'footwear'];
  const categoryPages = categories.map(category => ({
    url: `/shop/listing?category=${category}`,
    changefreq: 'daily',
    priority: '0.9'
  }));

  const allPages = [...staticPages, ...categoryPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Vinora Ecommerce Store
Sitemap: https://www.vinora.royalappleshimla.com/sitemap.xml

# Important pages
Allow: /shop/
Allow: /about
Allow: /contact
Allow: /faq

# Disallow admin and auth pages from crawling
Disallow: /admin/
Disallow: /unauth-page
Disallow: /auth/

# Allow Google Shopping Bot
User-agent: Googlebot
Allow: /

# Crawl-delay for all bots
Crawl-delay: 1`;
};

// Google Shopping Product Feed
export const generateProductFeed = (products = []) => {
  const feed = products.map(product => ({
    id: product._id,
    title: `${product.title} - Vinora`,
    description: product.description,
    link: `https://www.vinora.royalappleshimla.com/shop/product/${product._id}`,
    image_link: product.image ? (Array.isArray(product.image) ? product.image[0] : product.image) : '',
    condition: 'new',
    availability: product.totalStock > 0 ? 'in stock' : 'out of stock',
    price: `${product.salePrice > 0 ? product.salePrice : product.price} INR`,
    brand: 'Vinora',
    google_product_category: getCategoryMapping(product.category),
    product_type: product.category,
    custom_label_0: 'Vinora Premium',
    shipping_weight: '0.5 kg' // Default weight
  }));

  return feed;
};

// Map your categories to Google Shopping categories
const getCategoryMapping = (category) => {
  const categoryMap = {
    'men': 'Apparel & Accessories > Clothing > Men\'s Clothing',
    'women': 'Apparel & Accessories > Clothing > Women\'s Clothing',
    'kids': 'Apparel & Accessories > Clothing > Children\'s Clothing',
    'accessories': 'Apparel & Accessories > Accessories',
    'footwear': 'Apparel & Accessories > Shoes',
    'electronics': 'Electronics',
    'home': 'Home & Garden'
  };
  
  return categoryMap[category] || 'Apparel & Accessories';
};

export default {
  generateSitemap,
  generateRobotsTxt,
  generateProductFeed
};
