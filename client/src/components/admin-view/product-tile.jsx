import { useState } from "react";

function AdminProductTile({ product, handleDelete, populateEditData }) {
  console.log("🔥 COMPACT AdminProductTile:", product?.title);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  if (!product) {
    return <div>No product data</div>;
  }

  const images = product.images || (product.image ? [product.image] : []);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price || 0);
  };

  return (
    <div 
      style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '0',
        margin: '6px',
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0, 0, 0, 0.12)' 
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        position: 'relative'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {images.length > 0 ? (
          <div style={{ position: 'relative' }}>
            <img 
              src={images[currentImageIndex]} 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: '180px', 
                objectFit: 'cover'
              }}
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    fontSize: '14px',
                    color: '#374151'
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    fontSize: '14px',
                    color: '#374151'
                  }}
                >
                  →
                </button>
              </>
            )}
            
            {/* Image Counter & Sale Badge */}
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              display: 'flex',
              gap: '6px',
              alignItems: 'center'
            }}>
              {images.length > 1 && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {currentImageIndex + 1}/{images.length}
                </div>
              )}
              {product.salePrice > 0 && (
                <div style={{
                  background: '#ef4444',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  SALE
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '180px',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '6px' }}>📷</div>
            <p style={{ margin: 0, fontSize: '12px' }}>No Image</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ padding: '12px' }}>
        {/* Title & Tags Row */}
        <div style={{ marginBottom: '8px' }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: '0 0 6px 0',
            color: '#1e293b',
            lineHeight: '1.2',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.title}
          </h3>
          
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {product.category && (
              <span style={{
                background: '#dbeafe',
                color: '#1d4ed8',
                padding: '2px 6px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: '500'
              }}>
                {product.category}
              </span>
            )}
            {product.brand && (
              <span style={{
                background: '#f3e8ff',
                color: '#7c3aed',
                padding: '2px 6px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: '500'
              }}>
                {product.brand}
              </span>
            )}
          </div>
        </div>
        
        {/* Price & Stock Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {product.salePrice > 0 ? (
              <>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#059669'
                }}>
                  {formatPrice(product.salePrice)}
                </span>
                <span style={{
                  fontSize: '12px',
                  textDecoration: 'line-through',
                  color: '#9ca3af'
                }}>
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1f2937'
              }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            background: '#f9fafb',
            padding: '2px 6px',
            borderRadius: '6px'
          }}>
            Stock: {product.totalStock || 0}
          </div>
        </div>

        {/* Bottom Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#6b7280',
          marginBottom: '10px'
        }}>
          <span>⭐ {product.averageReview || 0}/5</span>
          {images.length > 0 && <span>📸 {images.length}</span>}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        padding: '0 12px 12px 12px',
        display: 'flex', 
        gap: '8px' 
      }}>
        <button 
          onClick={() => handleDelete && handleDelete(product._id)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#dc2626'}
          onMouseLeave={(e) => e.target.style.background = '#ef4444'}
        >
          Delete
        </button>
        <button 
          onClick={() => populateEditData && populateEditData(product)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = '#2563eb'}
          onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default AdminProductTile;
