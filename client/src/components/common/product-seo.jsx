import { Helmet } from 'react-helmet-async';

const ProductSEO = ({ product }) => {
  if (!product) return null;

  const productStructuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${product.title} - Vinora`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Vinora"
    },
    "category": product.category,
    "image": product.image ? (Array.isArray(product.image) ? product.image : [product.image]) : [],
    "offers": {
      "@type": "Offer",
      "price": product.salePrice > 0 ? product.salePrice : product.price,
      "priceCurrency": "INR",
      "availability": product.totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://www.vinora.royalappleshimla.com/shop/product/${product._id}`,
      "seller": {
        "@type": "Organization",
        "name": "Vinora"
      }
    },
    "aggregateRating": product.averageReview ? {
      "@type": "AggregateRating",
      "ratingValue": product.averageReview,
      "ratingCount": product.totalReviews || 1
    } : undefined,
    "sku": product._id,
    "mpn": product._id
  };

  const title = `${product.title} - Buy Online at Vinora`;
  const description = `${product.description.substring(0, 150)}... Shop premium ${product.category} at Vinora with secure checkout and fast delivery.`;
  const url = `https://www.vinora.royalappleshimla.com/shop/product/${product._id}`;
  const image = product.image ? (Array.isArray(product.image) ? product.image[0] : product.image) : "https://www.vinora.royalappleshimla.com/vinora-logo.png";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={`${product.title}, ${product.category}, Vinora, online shopping, buy ${product.category}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vinora" />
      <meta property="product:price:amount" content={product.salePrice > 0 ? product.salePrice : product.price} />
      <meta property="product:price:currency" content="INR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Product Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(productStructuredData)}
      </script>
    </Helmet>
  );
};

export default ProductSEO;
