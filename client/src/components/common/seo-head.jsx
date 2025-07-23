import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Vinora - Premium Ecommerce Store", 
  description = "Discover amazing products at Vinora - Your premium online shopping destination. Browse our exclusive collection of quality products with secure checkout and fast delivery.",
  keywords = "Vinora, ecommerce, online shopping, premium products, fashion, electronics, home decor",
  url = "https://www.vinora.royalappleshimla.com",
  image = "https://www.vinora.royalappleshimla.com/vinora-logo.png",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vinora",
    "description": description,
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": image
    },
    "author": {
      "@type": "Person",
      "name": "Krish",
      "url": "https://www.krish.royalappleshimla.com"
    },
    "sameAs": [
      "https://www.vinora.royalappleshimla.com"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.vinora.royalappleshimla.com/shop/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vinora" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
