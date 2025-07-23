import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Vinora - Premium Ecommerce Store", 
  description = "Discover amazing products at Vinora - Your premium online shopping destination. Browse our exclusive collection of quality products with secure checkout and fast delivery.",
  keywords = "Vinora, ecommerce, online shopping, premium products, fashion, electronics, home decor",
  canonicalUrl = "https://vinora.royalappleshimla.com",
  ogImage = "https://vinora.royalappleshimla.com/vinora-social-share.png",
  type = "website",
  customStructuredData = null
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vinora",
    "description": description,
    "url": canonicalUrl,
    "logo": {
      "@type": "ImageObject",
      "url": ogImage
    },
    "author": {
      "@type": "Person",
      "name": "Krish",
      "url": "https://krish.royalappleshimla.com"
    },
    "sameAs": [
      "https://vinora.royalappleshimla.com"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vinora.royalappleshimla.com/shop/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const finalStructuredData = customStructuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Vinora - Premium Online Shopping Store" />
      <meta property="og:site_name" content="Vinora" />
      <meta property="og:locale" content="en_US" />
      
      {/* WhatsApp specific meta tags */}
      <meta name="whatsapp:image" content={ogImage} />
      <meta name="whatsapp:title" content={title} />
      <meta name="whatsapp:description" content={description} />
      
      {/* Additional fallback meta tags for various platforms */}
      <meta property="image" content={ogImage} />
      <meta name="image" content={ogImage} />
      <meta name="thumbnail" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@vinora" />
      <meta property="twitter:creator" content="@vinora" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content="Vinora - Premium Online Shopping Store" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
